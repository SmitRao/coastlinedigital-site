/**
 * Coastline Digital - motion primitives
 *
 * Small, dependency-free versions of the motion patterns this site needs:
 * in-view reveals, a staggered word-level text effect, a pointer spotlight,
 * a magnetic CTA, and a scroll progress indicator.
 *
 * Every primitive is opt-in through a data attribute, and every primitive is
 * disabled (and any already-applied state settled) when the visitor asks for
 * reduced motion. Pointer primitives additionally require a fine pointer, so
 * touch devices never pay for them.
 */

(function () {
  'use strict';

  var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* Cleanup callbacks registered by primitives that attach live listeners. */
  var detachers = [];

  function motionAllowed() {
    return !reduceQuery.matches;
  }

  function onQueryChange(query, handler) {
    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', handler);
    } else if (typeof query.addListener === 'function') {
      query.addListener(handler);
    }
  }

  function rafThrottle(fn) {
    var scheduled = false;
    return function () {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(function () {
        scheduled = false;
        fn();
      });
    };
  }

  function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
  }

  /* ======================================================================
     In view: reveal sections and cards as they enter the viewport.
     Elements carry [data-reveal]; siblings get an incremental stagger so a
     grid resolves as a wave rather than all at once.
     ====================================================================== */

  function initInView() {
    var targets = Array.prototype.slice.call(
      document.querySelectorAll('[data-reveal], .animate-on-scroll')
    );
    if (!targets.length) return;

    var groupCounts = new WeakMap();

    targets.forEach(function (el) {
      var parent = el.parentElement || document.body;
      var index = groupCounts.get(parent) || 0;
      groupCounts.set(parent, index + 1);

      if (!el.style.getPropertyValue('--reveal-i')) {
        el.style.setProperty('--reveal-i', String(Math.min(index, 6)));
      }
    });

    function settleAll() {
      targets.forEach(function (el) {
        el.classList.add('is-inview', 'is-visible');
      });
    }

    if (!motionAllowed() || !('IntersectionObserver' in window)) {
      settleAll();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-inview', 'is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });

    detachers.push(function () {
      observer.disconnect();
      settleAll();
    });
  }

  /* ======================================================================
     Text effect: split a heading into words and float them up on load.
     The original string is kept as the accessible name so assistive tech
     reads one phrase instead of a list of words.
     ====================================================================== */

  function initTextEffect() {
    var targets = Array.prototype.slice.call(document.querySelectorAll('[data-text-effect]'));
    if (!targets.length) return;

    targets.forEach(function (el) {
      var text = el.textContent.replace(/\s+/g, ' ').trim();
      if (!text) return;

      var words = text.split(' ');
      var fragment = document.createDocumentFragment();
      var inners = [];

      words.forEach(function (word, i) {
        var mask = document.createElement('span');
        mask.className = 'text-effect__mask';

        var inner = document.createElement('span');
        inner.className = 'text-effect__word';
        inner.textContent = word;

        mask.appendChild(inner);
        fragment.appendChild(mask);
        inners.push(inner);

        if (i < words.length - 1) {
          fragment.appendChild(document.createTextNode(' '));
        }
      });

      if (!el.hasAttribute('aria-label')) {
        el.setAttribute('aria-label', text);
      }
      el.textContent = '';
      el.appendChild(fragment);
      el.classList.add('text-effect--split');

      if (!motionAllowed() || typeof el.animate !== 'function') {
        el.classList.add('is-settled');
        return;
      }

      inners.forEach(function (inner, i) {
        inner.animate(
          [
            { opacity: 0, transform: 'translate3d(0, 0.62em, 0)', filter: 'blur(6px)' },
            { opacity: 1, transform: 'translate3d(0, 0, 0)', filter: 'blur(0)' }
          ],
          {
            duration: 760,
            delay: 90 + i * 70,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both'
          }
        );
      });
    });
  }

  /* ======================================================================
     Spotlight: a soft highlight that tracks the pointer across a surface.
     Writes CSS custom properties; the gradient itself lives in CSS.
     ====================================================================== */

  function initSpotlight() {
    var targets = Array.prototype.slice.call(document.querySelectorAll('[data-spotlight]'));
    if (!targets.length) return;

    function enable() {
      targets.forEach(function (el) {
        if (el.__spotlightBound) return;
        el.__spotlightBound = true;

        el.__spotlightMove = function (event) {
          var rect = el.getBoundingClientRect();
          el.style.setProperty('--spot-x', (event.clientX - rect.left).toFixed(1) + 'px');
          el.style.setProperty('--spot-y', (event.clientY - rect.top).toFixed(1) + 'px');
          el.classList.add('is-spotlit');
        };
        el.__spotlightLeave = function () {
          el.classList.remove('is-spotlit');
        };

        el.addEventListener('pointermove', el.__spotlightMove);
        el.addEventListener('pointerleave', el.__spotlightLeave);
      });
    }

    function disable() {
      targets.forEach(function (el) {
        if (!el.__spotlightBound) return;
        el.removeEventListener('pointermove', el.__spotlightMove);
        el.removeEventListener('pointerleave', el.__spotlightLeave);
        el.classList.remove('is-spotlit');
        el.__spotlightBound = false;
      });
    }

    if (motionAllowed() && finePointerQuery.matches) enable();
    onQueryChange(finePointerQuery, function () {
      if (motionAllowed() && finePointerQuery.matches) enable();
      else disable();
    });
    detachers.push(disable);
  }

  /* ======================================================================
     Magnetic: nudge a CTA a few pixels toward the pointer. Deliberately
     capped small so it reads as responsiveness, not as a moving target.
     ====================================================================== */

  var MAGNET_MAX_PX = 6;

  function initMagnetic() {
    var targets = Array.prototype.slice.call(document.querySelectorAll('[data-magnetic]'));
    if (!targets.length) return;

    function enable() {
      targets.forEach(function (el) {
        if (el.__magneticBound) return;
        el.__magneticBound = true;

        el.__magneticMove = function (event) {
          var rect = el.getBoundingClientRect();
          var dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
          var dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
          el.style.setProperty('--magnet-x', (clamp(dx, -1, 1) * MAGNET_MAX_PX).toFixed(2) + 'px');
          el.style.setProperty('--magnet-y', (clamp(dy, -1, 1) * MAGNET_MAX_PX).toFixed(2) + 'px');
        };
        el.__magneticLeave = function () {
          el.style.setProperty('--magnet-x', '0px');
          el.style.setProperty('--magnet-y', '0px');
        };

        el.addEventListener('pointermove', el.__magneticMove);
        el.addEventListener('pointerleave', el.__magneticLeave);
        el.addEventListener('blur', el.__magneticLeave);
      });
    }

    function disable() {
      targets.forEach(function (el) {
        if (!el.__magneticBound) return;
        el.removeEventListener('pointermove', el.__magneticMove);
        el.removeEventListener('pointerleave', el.__magneticLeave);
        el.removeEventListener('blur', el.__magneticLeave);
        el.__magneticLeave();
        el.__magneticBound = false;
      });
    }

    if (motionAllowed() && finePointerQuery.matches) enable();
    onQueryChange(finePointerQuery, function () {
      if (motionAllowed() && finePointerQuery.matches) enable();
      else disable();
    });
    detachers.push(disable);
  }

  /* ======================================================================
     Scroll progress: how far through the page the reader is. This is a
     position indicator rather than decoration, so it stays under reduced
     motion; only its easing is dropped (handled in CSS).
     ====================================================================== */

  function initScrollProgress() {
    var bar = document.querySelector('[data-scroll-progress]');
    if (!bar) return;

    var update = rafThrottle(function () {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - window.innerHeight;
      var progress = scrollable > 0 ? clamp(window.scrollY / scrollable, 0, 1) : 0;
      bar.style.setProperty('--progress', progress.toFixed(4));
      bar.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
    });

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ====================================================================== */

  function init() {
    initInView();
    initTextEffect();
    initSpotlight();
    initMagnetic();
    initScrollProgress();

    onQueryChange(reduceQuery, function () {
      if (reduceQuery.matches) {
        detachers.forEach(function (detach) {
          detach();
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
