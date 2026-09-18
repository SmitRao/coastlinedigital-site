/**
 * Coastline Digital - site behaviour
 *
 * Navigation, anchor scrolling, and contact form handling. Visual motion
 * lives in motion.js so this file stays useful even when motion is off.
 */

(function () {
  'use strict';

  var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function scrollBehavior() {
    return reduceQuery.matches ? 'auto' : 'smooth';
  }

  /* --- Mobile navigation ------------------------------------------------- */

  var navToggle = document.querySelector('.nav__toggle');
  var navMenu = document.querySelector('.nav__menu');

  function closeMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('nav__menu--open');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('nav__menu--open');
    });

    navMenu.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      if (!navMenu.classList.contains('nav__menu--open')) return;
      closeMenu();
      navToggle.focus();
    });

    document.addEventListener('click', function (event) {
      if (!navMenu.classList.contains('nav__menu--open')) return;
      if (navMenu.contains(event.target) || navToggle.contains(event.target)) return;
      closeMenu();
    });
  }

  /* --- Header state on scroll -------------------------------------------- */

  var nav = document.querySelector('.nav');

  if (nav) {
    var navTicking = false;

    var updateNav = function () {
      nav.classList.toggle('nav--scrolled', window.scrollY > 16);
      navTicking = false;
    };

    window.addEventListener(
      'scroll',
      function () {
        if (navTicking) return;
        navTicking = true;
        window.requestAnimationFrame(updateNav);
      },
      { passive: true }
    );

    updateNav();
  }

  /* --- Anchor links, offset for the fixed header ------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      var offset = (nav ? nav.offsetHeight : 0) + 20;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top: top, behavior: scrollBehavior() });

      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', targetId);
      }

      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* --- Contact form ------------------------------------------------------ */

  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      var submit = contactForm.querySelector('button[type="submit"]');
      if (!submit) return;
      submit.disabled = true;
      submit.textContent = 'Sending...';
    });
  }

  /* FormSubmit returns to /?sent=1 - confirm, lock the form, tidy the URL. */
  if (new URLSearchParams(window.location.search).get('sent') === '1') {
    var success = document.getElementById('success-message');
    var contactSection = document.getElementById('contact');

    if (success) {
      success.hidden = false;

      if (contactSection) {
        window.setTimeout(function () {
          contactSection.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
        }, 100);
      }

      if (contactForm) {
        contactForm.setAttribute('aria-disabled', 'true');
        contactForm.style.opacity = '0.55';
        contactForm.style.pointerEvents = 'none';
        contactForm.querySelectorAll('input, textarea, button').forEach(function (field) {
          field.disabled = true;
        });
      }
    }

    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  /* --- A small nod to anyone who goes looking ---------------------------- */

  var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  var konamiIndex = 0;

  document.addEventListener('keydown', function (event) {
    if (event.keyCode !== konami[konamiIndex]) {
      konamiIndex = 0;
      return;
    }
    konamiIndex += 1;
    if (konamiIndex < konami.length) return;
    konamiIndex = 0;
    console.log('%c 🌊 ', 'font-size: 48px;');
    console.log(
      '%cYou found the hidden wave! Thanks for exploring.',
      'color: #0F2744; font-family: Georgia, serif; font-size: 14px;'
    );
    console.log(
      '%cCoastline Digital - SoCal local sites and listing video',
      'color: #D4C4A8; font-size: 12px;'
    );
  });
})();
