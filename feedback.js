window.trackFeedbackFormClick = function (location) {
  var payload = { location: location, form: 'log_resource_interaction' };
  window.dispatchEvent(new CustomEvent('feedback_form_click', { detail: payload }));
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'feedback_form_click', payload);
  }
  if (typeof window.plausible === 'function') {
    window.plausible('feedback_form_click', { props: payload });
  }
};
