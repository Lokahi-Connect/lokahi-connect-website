(function () {
  'use strict';

  // The reviewed release currently uses the explicit email-preparation path.
  // Replace it with the verified hosted form only after the runbook's delivery gate.
  var destination = 'stephanie@lokahiconnect.org';
  var form = document.getElementById('remote-inquiry-form');
  if (!form) return;
  var status = document.getElementById('remote-inquiry-status');
  var copyButton = document.getElementById('copy-remote-inquiry');
  var copyArea = document.getElementById('remote-copy-message');
  var copyPanel = document.getElementById('remote-copy-panel');

  function value(name) { return String(form.elements[name].value || '').trim(); }
  function message() {
    return [
      'Lokahi Connect — remote services inquiry',
      '',
      'Adult contact name: ' + value('adult_name'),
      'Reply email: ' + value('email'),
      'Interest: ' + value('interest'),
      'General question: ' + (value('message') || 'I would like to discuss whether remote support is a good fit.'),
      'Contact consent: I agree that Stephanie may reply about this inquiry. No marketing subscription requested.',
      'Source: Services page',
      'Prepared at: ' + new Date().toISOString(),
      '',
      'Follow-up for Stephanie:',
      '1. Acknowledge the inquiry and the person’s stated goals.',
      '2. Explain the relevant service, current availability, and fees; confirm time zone before scheduling.',
      '3. Agree the next consultation or intake step. Request sensitive records only through the appropriate intake process.',
      '4. Record whether a reply is owed; close the inquiry when next steps are agreed or the person declines.'
    ].join('\n');
  }
  function validate() {
    ['adult_name', 'email'].forEach(function (name) {
      form.elements[name].value = value(name);
    });
    return form.reportValidity();
  }
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validate()) return;
    var body = message();
    status.textContent = 'Your inquiry has not been sent by this website. Your email app should open next; review the message and choose Send. If it does not open, use Copy inquiry below.';
    window.location.href = 'mailto:' + destination + '?subject=' + encodeURIComponent('Remote services inquiry — Lokahi Connect') + '&body=' + encodeURIComponent(body);
  });
  copyButton.hidden = false;
  copyButton.addEventListener('click', function () {
    if (!validate()) return;
    var text = 'To: ' + destination + '\nSubject: Remote services inquiry — Lokahi Connect\n\n' + message();
    function manualCopy() {
      copyPanel.hidden = false;
      copyArea.value = text;
      copyArea.focus();
      copyArea.select();
      status.textContent = 'Automatic copying is unavailable. Copy the selected text, paste it into your email, and send it to ' + destination + '. Nothing has been sent yet.';
    }
    if (!navigator.clipboard || !navigator.clipboard.writeText) { manualCopy(); return; }
    navigator.clipboard.writeText(text).then(function () {
      status.textContent = 'Copied. Paste the inquiry into your email and send it to ' + destination + '. Nothing has been sent yet.';
    }).catch(manualCopy);
  });
}());
