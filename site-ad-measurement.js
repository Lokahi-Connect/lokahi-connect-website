(function () {
  'use strict';

  // This public pixel ID is not an API credential. Never add CAPI secrets here.
  var pixelId = 'F5tCpcgaWsXqAFzEhnanKx';
  var consentKey = 'lokahi_ad_measurement_consent_v1';
  var pendingKey = 'lokahi_ad_inquiry_v1';
  var formPath = '/appEDbkXoKtlrJPSR/pagRy0ILKrkFzxKR2/form';
  var confirmationPath = '/inquiry-received.html';
  var eligiblePage = window.location.pathname === '/services.html' ||
    window.location.pathname === confirmationPath;
  var consent = readChoice();
  var initialized = false;
  var pageMeasured = false;
  var pending = readSubmissionReturn();

  function readChoice() {
    try {
      var value = window.localStorage.getItem(consentKey);
      return value === 'granted' || value === 'denied' ? value : null;
    } catch (error) { return null; }
  }

  function clearPending() {
    pending = null;
    try { window.sessionStorage.removeItem(pendingKey); } catch (error) { /* Fail closed. */ }
  }

  function readSubmissionReturn() {
    if (window.location.pathname !== confirmationPath) return null;
    try {
      var item = JSON.parse(window.sessionStorage.getItem(pendingKey));
      var elapsed = item ? Date.now() - item.startedAt : -1;
      var fromAirtable = new URL(document.referrer).origin === 'https://airtable.com';
      if (!item || !fromAirtable || typeof item.startedAt !== 'number' ||
          !Number.isFinite(elapsed) || elapsed < 0 || elapsed > 30 * 60 * 1000 ||
          !/^inquiry_[a-f0-9-]{36}$/.test(item.eventId)) {
        window.sessionStorage.removeItem(pendingKey);
        return null;
      }
      return item;
    } catch (error) {
      try { window.sessionStorage.removeItem(pendingKey); } catch (ignored) { /* No storage. */ }
      return null;
    }
  }

  function initializePixel() {
    if (initialized || consent !== 'granted') return;
    if (!window.oaiq) {
      var queue = function () { queue.q.push(arguments); };
      queue.q = [];
      window.oaiq = queue;
      var script = document.createElement('script');
      script.async = true;
      script.src = 'https://bzrcdn.openai.com/sdk/oaiq.min.js';
      script.setAttribute('data-lokahi-openai-pixel', '');
      document.head.appendChild(script);
    }
    // The SDK is never loaded before this separate opt-in. Preserve its existing
    // click-reference cookie on return pages: consent=false would delete it.
    window.oaiq('consent', true);
    window.oaiq('init', { pixelId: pixelId });
    initialized = true;
  }

  function measureAllowedEvents() {
    if (consent !== 'granted' || !eligiblePage) return;
    initializePixel();
    if (!pageMeasured) {
      window.oaiq('measure', 'page_viewed', {
        type: 'contents',
        contents: [{ id: 'service_information', content_type: 'page' }]
      }, { opt_out: true });
      pageMeasured = true;
    }
    if (!pending) return;
    var eventId = pending.eventId;
    // Consume before queueing. Reloads and consent toggles must not create leads.
    // This is a conservative browser-return signal, not a server receipt.
    clearPending();
    window.oaiq('measure', 'lead_created', { type: 'customer_action' }, {
      event_id: eventId,
      opt_out: true
    });
  }

  function updateControls() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-ad-choice-status]'), function (node) {
      node.textContent = consent === 'granted'
        ? 'Ad measurement is on. You can turn it off at any time.'
        : 'Ad measurement is off. You can still send an inquiry.';
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-ad-choice]'), function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-ad-choice') === consent));
    });
  }

  function setChoice(value) {
    if (value !== 'granted' && value !== 'denied') return;
    consent = value;
    try { window.localStorage.setItem(consentKey, value); } catch (error) { /* This page only. */ }
    if (value === 'granted') {
      if (initialized) window.oaiq('consent', true);
      measureAllowedEvents();
    } else {
      clearPending();
      if (window.oaiq) window.oaiq('consent', false);
      // Also clear known first-party measurement cookies on the preferences page.
      ['__oppref', '__obref'].forEach(function (name) {
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax; Secure';
        document.cookie = name + '=; Max-Age=0; Path=/; Domain=lokahiconnect.org; SameSite=Lax; Secure';
      });
    }
    updateControls();
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-ad-choice]'), function (button) {
    button.addEventListener('click', function () { setChoice(button.getAttribute('data-ad-choice')); });
  });

  document.addEventListener('click', function (event) {
    if (consent !== 'granted' || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link || (link.target && link.target !== '_self')) return;
    try {
      var destination = new URL(link.href, window.location.href);
      if (destination.origin !== 'https://airtable.com' || destination.pathname !== formPath) return;
      // Store only a random event ID and time. Never read the form or pass IDs to Airtable.
      window.sessionStorage.setItem(pendingKey, JSON.stringify({
        eventId: 'inquiry_' + window.crypto.randomUUID(),
        startedAt: Date.now()
      }));
    } catch (error) { /* Without storage or UUID support, do not infer a submission. */ }
  });

  window.addEventListener('storage', function (event) {
    if (event.key !== consentKey) return;
    consent = readChoice();
    if (consent !== 'granted') {
      clearPending();
      if (window.oaiq) window.oaiq('consent', false);
    } else {
      if (initialized) window.oaiq('consent', true);
      measureAllowedEvents();
    }
    updateControls();
  });

  updateControls();
  measureAllowedEvents();
}());
