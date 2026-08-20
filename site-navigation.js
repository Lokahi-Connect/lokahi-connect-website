(function () {
  'use strict';

  var nav = document.querySelector('nav[aria-label="Primary navigation"]');
  if (!nav) return;

  var toggle = nav.querySelector('.nav-toggle');
  var menu = nav.querySelector('.nav-links');
  var toggleLabel = nav.querySelector('.nav-toggle-label');
  if (!toggle || !menu) return;
  nav.setAttribute('data-nav-ready', '');

  function setOpen(isOpen, returnFocus) {
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      nav.setAttribute('data-nav-open', '');
    } else {
      nav.removeAttribute('data-nav-open');
    }
    if (toggleLabel) toggleLabel.textContent = isOpen ? 'Close menu' : 'Open menu';
    if (!isOpen && returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true', false);
  });

  menu.addEventListener('click', function (event) {
    if (event.target.closest('a') && window.matchMedia('(max-width: 900px)').matches) {
      setOpen(false, false);
    }
  });

  document.addEventListener('click', function (event) {
    if (toggle.getAttribute('aria-expanded') === 'true' && !nav.contains(event.target)) {
      setOpen(false, false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });

  window.addEventListener('resize', function () {
    if (!window.matchMedia('(max-width: 900px)').matches) setOpen(false, false);
  });
}());
