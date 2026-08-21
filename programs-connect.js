(function () {
  'use strict';

  var destination = 'info@lokahiconnect.org';

  function value(form, name) {
    var field = form.elements[name];
    return field ? String(field.value || '').trim() : '';
  }

  function copyText(text, status, fallback) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      status.textContent = fallback;
      return;
    }
    navigator.clipboard.writeText(text).then(function () {
      status.textContent = 'Copied. Paste this into an email to ' + destination + '.';
    }).catch(function () {
      status.textContent = fallback;
    });
  }

  function openEmail(message, status) {
    status.textContent = 'Your email app should open. Review the message and choose Send.';
    window.location.href = message.mailto;
  }

  var inquiryForm = document.getElementById('service-inquiry-form');
  var inquiryStatus = document.getElementById('inquiry-status');
  var copyInquiry = document.getElementById('copy-inquiry');

  function buildServiceInquiryEmail() {
    var role = value(inquiryForm, 'role');
    var interest = value(inquiryForm, 'interest');
    var location = value(inquiryForm, 'location') || 'Not specified';
    var replyEmail = value(inquiryForm, 'email');
    var message = value(inquiryForm, 'message');
    var subject = 'Website inquiry — ' + interest;
    var body = [
      'Lokahi Connect website inquiry',
      '',
      'I am a: ' + role,
      'I am interested in: ' + interest,
      'Preferred location or format: ' + location,
      'Reply email: ' + replyEmail,
      '',
      'What would be helpful to know:',
      message,
      '',
      'Privacy acknowledgment: I did not include private student, school, evaluation, or health records.'
    ].join('\n');
    return {
      subject: subject,
      body: body,
      mailto: 'mailto:' + destination + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
    };
  }

  window.buildServiceInquiryEmail = buildServiceInquiryEmail;

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!inquiryForm.reportValidity()) return;
      openEmail(buildServiceInquiryEmail(), inquiryStatus);
    });

    if (copyInquiry) {
      copyInquiry.addEventListener('click', function () {
        if (!inquiryForm.reportValidity()) return;
        var inquiry = buildServiceInquiryEmail();
        copyText('Subject: ' + inquiry.subject + '\n\n' + inquiry.body, inquiryStatus, 'Copy is unavailable. Use Prepare inquiry email or email ' + destination + ' directly.');
      });
    }

    Array.prototype.forEach.call(document.querySelectorAll('.js-inquiry-interest'), function (link) {
      link.addEventListener('click', function () {
        var interest = link.getAttribute('data-inquiry-interest');
        if (interest && inquiryForm.elements.interest) inquiryForm.elements.interest.value = interest;
      });
    });
  }

  var updatesForm = document.getElementById('updates-request-form');
  var updatesStatus = document.getElementById('updates-status');
  var copyUpdates = document.getElementById('copy-updates');

  function buildEmailUpdatesRequest() {
    var firstName = value(updatesForm, 'first_name');
    var lastName = value(updatesForm, 'last_name');
    var email = value(updatesForm, 'email');
    var topic = value(updatesForm, 'topic') || 'All updates';
    var subject = 'Email updates request — ' + topic;
    var body = [
      'Lokahi Connect email updates signup',
      '',
      'First name: ' + (firstName || 'Not offered'),
      'Last name: ' + (lastName || 'Not offered'),
      'Email address: ' + email,
      'Updates requested: ' + topic,
      'Signup source: Website email request',
      '',
      'Consent: I request occasional email updates from Lokahi Connect and understand that I may unsubscribe at any time.'
    ].join('\n');
    return {
      subject: subject,
      body: body,
      mailto: 'mailto:' + destination + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
    };
  }

  window.buildEmailUpdatesRequest = buildEmailUpdatesRequest;

  if (updatesForm) {
    updatesForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!updatesForm.reportValidity()) return;
      openEmail(buildEmailUpdatesRequest(), updatesStatus);
    });

    if (copyUpdates) {
      copyUpdates.addEventListener('click', function () {
        if (!updatesForm.reportValidity()) return;
        var request = buildEmailUpdatesRequest();
        copyText('Subject: ' + request.subject + '\n\n' + request.body, updatesStatus, 'Copy is unavailable. Use Prepare signup request or email ' + destination + ' directly.');
      });
    }
  }
}());
