(function () {
  'use strict';

  var form = document.getElementById('community-feedback-form');
  if (!form) return;

  var status = document.getElementById('feedback-status');
  var copyButton = document.getElementById('copy-feedback');
  var requiredGroups = [
    ['perspective', 'Choose at least one perspective.'],
    ['visit_reason', 'Choose at least one reason for visiting.'],
    ['concern', 'Choose at least one concern.']
  ];

  function checkedValues(name) {
    return Array.prototype.slice.call(form.querySelectorAll('[name="' + name + '"]:checked')).map(function (field) {
      return field.value;
    });
  }

  function value(name) {
    var field = form.elements[name];
    return field ? String(field.value || '').trim() : '';
  }

  function validateGroups() {
    var valid = true;
    requiredGroups.forEach(function (group) {
      var boxes = form.querySelectorAll('[name="' + group[0] + '"]');
      if (!boxes.length) return;
      var hasValue = checkedValues(group[0]).length > 0;
      boxes[0].setCustomValidity(hasValue ? '' : group[1]);
      if (!hasValue) valid = false;
    });
    return valid;
  }

  function validateContact() {
    var email = form.elements.contact_email;
    if (!email) return true;
    var contactRequested = value('contact_permission') === 'Yes';
    email.setCustomValidity(contactRequested && !String(email.value || '').trim() ? 'Enter an email address if you would like Lokahi Connect to contact you.' : '');
    return !email.validationMessage;
  }

  function addAnswer(lines, label, answer) {
    if (!answer || (Array.isArray(answer) && !answer.length)) return;
    lines.push(label + ':');
    lines.push(Array.isArray(answer) ? answer.map(function (item) { return '- ' + item; }).join('\n') : answer);
    lines.push('');
  }

  function buildFeedbackEmail() {
    var lines = [
      'Lokahi Connect community feedback',
      'Submitted voluntarily through the website questionnaire.',
      ''
    ];

    addAnswer(lines, 'Perspective(s)', checkedValues('perspective'));
    addAnswer(lines, 'Location', value('location'));
    addAnswer(lines, 'Relevant age group(s)', checkedValues('age_group'));
    addAnswer(lines, 'What brought me to the website', checkedValues('visit_reason'));
    addAnswer(lines, 'Concerns that feel least supported', checkedValues('concern'));
    addAnswer(lines, 'Information that was hard to find or understand', value('hard_to_find'));
    addAnswer(lines, 'Resources or opportunities that would help', checkedValues('resource_need'));
    addAnswer(lines, 'An overlooked concern, population, or need', value('overlooked'));
    addAnswer(lines, 'What Lokahi Connect should keep doing', value('keep_doing'));
    addAnswer(lines, 'Website usefulness', value('usefulness'));
    addAnswer(lines, 'May Lokahi Connect contact me?', value('contact_permission'));
    addAnswer(lines, 'Name (optional)', value('contact_name'));
    addAnswer(lines, 'Preferred email (optional)', value('contact_email'));
    addAnswer(lines, 'Anonymous quotation permission', value('quote_permission'));
    lines.push('Acknowledgment: I did not intentionally include confidential student records, medical information, or a formal complaint.');

    var location = value('location') || 'Location not provided';
    var subject = 'Community feedback — ' + location;
    var body = lines.join('\n');
    return {
      subject: subject,
      body: body,
      mailto: 'mailto:info@lokahiconnect.org?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
    };
  }

  window.buildCommunityFeedbackEmail = buildFeedbackEmail;

  form.addEventListener('change', function () {
    validateGroups();
    validateContact();
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    validateGroups();
    validateContact();
    if (!form.reportValidity()) return;
    var message = buildFeedbackEmail();
    status.textContent = 'Your email app should open. Please review the responses and choose Send.';
    window.location.href = message.mailto;
  });

  if (copyButton) {
    copyButton.addEventListener('click', function () {
      validateGroups();
      validateContact();
      if (!form.reportValidity()) return;
      var message = buildFeedbackEmail();
      var text = 'Subject: ' + message.subject + '\n\n' + message.body;
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        status.textContent = 'Copy is unavailable in this browser. Use Prepare feedback email instead.';
        return;
      }
      navigator.clipboard.writeText(text).then(function () {
        status.textContent = 'Responses copied. You can paste them into an email to info@lokahiconnect.org.';
      }).catch(function () {
        status.textContent = 'Copy did not complete. Use Prepare feedback email instead.';
      });
    });
  }
}());
