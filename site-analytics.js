(function () {
  'use strict';

  var measurementId = 'G-727LCMWN8K';
  var consentKey = 'lokahi_analytics_consent_v1';
  var tagSelector = 'script[data-lokahi-google-tag]';
  var currentConsent = storedConsent();
  var analyticsScript = document.currentScript;
  var privacyUrl = analyticsScript
    ? new URL('privacy.html#analytics', analyticsScript.src).href
    : '/privacy.html#analytics';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });
  window.gtag('set', 'ads_data_redaction', true);
  window.gtag('set', 'url_passthrough', false);

  function storedConsent() {
    try {
      var value = window.localStorage.getItem(consentKey);
      return value === 'granted' || value === 'denied' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function rememberConsent(value) {
    try {
      window.localStorage.setItem(consentKey, value);
    } catch (error) {
      // The choice still applies to the current page when storage is unavailable.
    }
  }

  function loadGoogleAnalytics() {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    if (document.querySelector(tagSelector)) return;
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    tag.setAttribute('data-lokahi-google-tag', measurementId);
    document.head.appendChild(tag);
  }

  function removeChoicePanel() {
    var panel = document.getElementById('analytics-consent-panel');
    if (panel) panel.remove();
  }

  function applyConsent(value) {
    if (value !== 'granted' && value !== 'denied') return;
    currentConsent = value;
    rememberConsent(value);
    if (value === 'granted') {
      loadGoogleAnalytics();
      recordInquirySubmission();
    } else {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
    }
    removeChoicePanel();
    window.dispatchEvent(new CustomEvent('lokahi_analytics_consent', {
      detail: { analytics: value }
    }));
  }

  function showChoicePanel() {
    removeChoicePanel();

    var panel = document.createElement('section');
    panel.id = 'analytics-consent-panel';
    panel.className = 'analytics-consent';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'Website analytics choice');
    panel.innerHTML = [
      '<div class="analytics-consent__copy">',
      '<strong>Help us improve this website?</strong>',
      '<p>With your permission, Lokahi Connect uses Google Analytics to understand which pages and resources are useful. Analytics is off unless you allow it. Advertising and cross-device signals remain off.</p>',
      '</div>',
      '<div class="analytics-consent__actions">',
      '<button type="button" class="analytics-consent__allow">Allow analytics</button>',
      '<button type="button" class="analytics-consent__decline">No thanks</button>',
      '<a href="' + privacyUrl + '">Privacy details</a>',
      '</div>'
    ].join('');

    panel.querySelector('.analytics-consent__allow').addEventListener('click', function () {
      applyConsent('granted');
    });
    panel.querySelector('.analytics-consent__decline').addEventListener('click', function () {
      applyConsent('denied');
    });
    document.body.appendChild(panel);
  }


  function prepareInquirySource() {
    // Pass only this recognized campaign label, never the full URL or click ID.
    // The visible, optional form answer remains editable by the visitor.
    var params = new URLSearchParams(window.location.search);
    if (params.get('utm_source') !== 'chatgpt' ||
        params.get('utm_medium') !== 'paid' ||
        params.get('utm_campaign') !== 'remote_services') return;
    Array.prototype.forEach.call(document.querySelectorAll('a[href]'), function (link) {
      var destination;
      try { destination = new URL(link.href, window.location.href); } catch (error) { return; }
      if (destination.origin !== 'https://airtable.com' ||
          destination.pathname !== '/appEDbkXoKtlrJPSR/pagRy0ILKrkFzxKR2/form') return;
      destination.searchParams.set('prefill_How did you hear about us?', 'ChatGPT ad');
      link.href = destination.href;
    });
  }

  function recordInquirySubmission() {
    if (currentConsent !== 'granted' ||
        window.location.pathname !== '/inquiry-received.html') return;
    var startedAt = 0;
    try {
      startedAt = Number(window.sessionStorage.getItem('lokahi_service_inquiry_started_at'));
      window.sessionStorage.removeItem('lokahi_service_inquiry_started_at');
    } catch (error) {
      return;
    }
    var elapsed = Date.now() - startedAt;
    if (!startedAt || elapsed < 0 || elapsed > 30 * 60 * 1000) return;
    // Count only an Airtable post-submission redirect, never form contents or record IDs.
    window.gtag('event', 'service_inquiry_submitted', {
      contact_method: 'airtable_form',
      page_location: window.location.origin + window.location.pathname,
      transport_type: 'beacon'
    });
  }

  function initializeAnalyticsChoice() {
    prepareInquirySource();
    var choice = currentConsent;
    if (choice === 'granted') {
      loadGoogleAnalytics();
      recordInquirySubmission();
    }
    if (!choice) showChoicePanel();

    Array.prototype.forEach.call(document.querySelectorAll('[data-analytics-preferences]'), function (button) {
      button.addEventListener('click', showChoicePanel);
    });

    document.addEventListener('click', function (event) {
      if (currentConsent !== 'granted') return;
      var link = event.target.closest && event.target.closest('a[href]');
      if (!link) return;
      var destination;
      try { destination = new URL(link.href, window.location.href); } catch (error) { return; }
      var method = null;
      if (destination.origin === 'https://airtable.com' &&
          destination.pathname === '/appEDbkXoKtlrJPSR/pagRy0ILKrkFzxKR2/form') {
        method = 'airtable_form';
      } else if (destination.protocol === 'mailto:' &&
          destination.pathname === 'stephanie@lokahiconnect.org' &&
          destination.searchParams.get('subject') === 'Remote services inquiry') {
        method = 'email';
      }
      if (!method) return;
      if (method === 'airtable_form') {
        try {
          window.sessionStorage.setItem('lokahi_service_inquiry_started_at', String(Date.now()));
        } catch (error) {
          // The click can still be measured when session storage is unavailable.
        }
      }
      // Measure opening a contact route, never the form contents or an enrollment.
      // Do not pass link text, email bodies, query strings, or learner information.
      window.gtag('event', 'service_inquiry_click', {
        contact_method: method,
        page_location: window.location.origin + window.location.pathname,
        transport_type: 'beacon'
      });
    });
  }

  window.LokahiAnalytics = Object.freeze({
    measurementId: measurementId,
    getConsent: function () { return currentConsent; },
    hasConsent: function () { return currentConsent === 'granted'; },
    setConsent: applyConsent,
    showPreferences: showChoicePanel
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnalyticsChoice, { once: true });
  } else {
    initializeAnalyticsChoice();
  }
}());

