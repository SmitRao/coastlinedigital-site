/* Coastline Digital. Generated from src/scripts/main.js. Do not edit directly. */
/**
 * Coastline Digital: progressive enhancements.
 * Every page works without this script. It adds navigation behavior,
 * motion, tabs, form validation, and consent-aware conversion tracking.
 */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var config = readConfig();

  function readConfig() {
    try {
      return JSON.parse(doc.getElementById("cd-config").textContent);
    } catch (e) {
      return { analytics: {} };
    }
  }

  function storage(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(key);
      if (value === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  }

  /* ------------------------------------------------------------------
     Conversion tracking. No provider is configured by default, in which
     case track() only dispatches a DOM event and sends nothing anywhere.
     ------------------------------------------------------------------ */
  var analytics = config.analytics || {};
  var CONSENT_KEY = "cd-analytics-consent";
  var trackingReady = false;

  function track(name, props) {
    props = props || {};
    doc.dispatchEvent(new CustomEvent("cd:track", { detail: { name: name, props: props } }));
    if (!trackingReady) return;
    if (analytics.provider === "plausible" && typeof window.plausible === "function") {
      window.plausible(name, { props: props });
    } else if (analytics.provider === "ga4" && typeof window.gtag === "function") {
      window.gtag("event", name, props);
    }
  }

  function loadAnalytics() {
    if (trackingReady || !analytics.provider) return;
    var script = doc.createElement("script");
    script.async = true;
    if (analytics.provider === "plausible") {
      window.plausible =
        window.plausible ||
        function () {
          (window.plausible.q = window.plausible.q || []).push(arguments);
        };
      script.src = "https://plausible.io/js/script.tagged-events.js";
      script.setAttribute("data-domain", analytics.plausibleDomain);
    } else if (analytics.provider === "ga4" && analytics.ga4MeasurementId) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", analytics.ga4MeasurementId, { anonymize_ip: true });
      script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(analytics.ga4MeasurementId);
    } else {
      return;
    }
    doc.head.appendChild(script);
    trackingReady = true;
  }

  function consentBanner() {
    if (!analytics.provider) return;
    var choice = storage(CONSENT_KEY);
    if (choice === "granted") return loadAnalytics();
    if (choice === "denied") return;
    var banner = doc.createElement("section");
    banner.className = "consent";
    banner.setAttribute("aria-label", "Analytics consent");
    banner.innerHTML =
      '<p>We would like to use privacy-friendly analytics to understand how visitors use this site. Nothing loads unless you agree. <a href="/privacy/">Privacy policy</a></p>' +
      '<div class="consent__actions"><button type="button" class="btn btn--secondary btn--sm" data-consent="denied">Decline</button>' +
      '<button type="button" class="btn btn--primary btn--sm" data-consent="granted">Accept</button></div>';
    banner.addEventListener("click", function (event) {
      var button = event.target.closest("[data-consent]");
      if (!button) return;
      storage(CONSENT_KEY, button.getAttribute("data-consent"));
      if (button.getAttribute("data-consent") === "granted") loadAnalytics();
      banner.remove();
    });
    doc.body.appendChild(banner);
  }

  doc.addEventListener("click", function (event) {
    var el = event.target.closest("[data-track]");
    if (el && el.tagName === "A") track("cta_click", { id: el.getAttribute("data-track") });
  });

  /* ------------------------------------------------------------------
     Header: scroll state, mobile menu, services menu
     ------------------------------------------------------------------ */
  var header = doc.querySelector("[data-header]");
  var navToggle = doc.querySelector("[data-nav-toggle]");
  var mobileNav = doc.getElementById("mobile-nav");
  var desktop = window.matchMedia("(min-width: 1160px)");

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMobileNav(open, returnFocus) {
    if (!navToggle || !mobileNav) return;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.querySelector(".sr-only").textContent = open ? "Close menu" : "Menu";
    mobileNav.hidden = !open;
    header.classList.toggle("is-open", open);
    doc.body.classList.toggle("nav-open", open);
    if (!open && returnFocus) navToggle.focus();
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      setMobileNav(navToggle.getAttribute("aria-expanded") !== "true");
    });
    mobileNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMobileNav(false);
    });
    var closeOnDesktop = function () {
      if (desktop.matches) setMobileNav(false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", closeOnDesktop);
  }

  var menuItem = doc.querySelector("[data-menu]");
  var menuToggle = menuItem && menuItem.querySelector(".primary-nav__toggle");
  var menuPanel = menuItem && doc.getElementById(menuToggle.getAttribute("aria-controls"));
  var hoverTimer;

  function setMenu(open, focusToggle) {
    if (!menuToggle) return;
    window.clearTimeout(hoverTimer);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuPanel.hidden = !open;
    if (!open && focusToggle) menuToggle.focus();
  }

  if (menuToggle && menuPanel) {
    menuToggle.addEventListener("click", function () {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    menuItem.addEventListener("mouseenter", function () {
      if (finePointer.matches) setMenu(true);
    });
    menuItem.addEventListener("mouseleave", function () {
      if (!finePointer.matches) return;
      hoverTimer = window.setTimeout(function () {
        setMenu(false);
      }, 180);
    });
    menuItem.addEventListener("focusout", function (event) {
      if (!menuItem.contains(event.relatedTarget)) setMenu(false);
    });
    doc.addEventListener("click", function (event) {
      if (!menuItem.contains(event.target)) setMenu(false);
    });
  }

  doc.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    if (menuToggle && menuToggle.getAttribute("aria-expanded") === "true") setMenu(false, true);
    if (navToggle && navToggle.getAttribute("aria-expanded") === "true") setMobileNav(false, true);
  });

  /* ------------------------------------------------------------------
     Motion: reveal on scroll and a persistent pause control
     ------------------------------------------------------------------ */
  var MOTION_KEY = "cd-motion";
  var motionButtons = Array.prototype.slice.call(doc.querySelectorAll("[data-motion-toggle]"));
  var animatedSvgs = Array.prototype.slice.call(doc.querySelectorAll(".hero-visual__svg"));
  var revealTargets = Array.prototype.slice.call(doc.querySelectorAll("[data-reveal]"));
  var observer;

  function motionPaused() {
    return reduceMotion.matches || storage(MOTION_KEY) === "paused";
  }

  function revealAll() {
    if (observer) observer.disconnect();
    revealTargets.forEach(function (el) {
      el.classList.remove("reveal-pending");
    });
  }

  function applyMotion() {
    var paused = motionPaused();
    root.classList.toggle("motion-paused", paused);
    animatedSvgs.forEach(function (svg) {
      if (typeof svg.pauseAnimations !== "function") return;
      if (paused) svg.pauseAnimations();
      else svg.unpauseAnimations();
    });
    motionButtons.forEach(function (button) {
      var label = paused ? "Resume animations" : "Pause animations";
      button.setAttribute("aria-pressed", String(paused));
      button.disabled = reduceMotion.matches;
      var text = button.querySelector(".sr-only") || button;
      text.textContent = reduceMotion.matches ? "Animations reduced by your device settings" : label;
    });
    if (paused) revealAll();
  }

  motionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      storage(MOTION_KEY, motionPaused() ? null : "paused");
      applyMotion();
    });
  });
  if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", applyMotion);

  if (!motionPaused() && "IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    var fold = window.innerHeight;
    revealTargets.forEach(function (el) {
      if (el.getBoundingClientRect().top < fold) return;
      // Stagger siblings that enter together, such as cards in a grid.
      var siblings = Array.prototype.filter.call(el.parentElement.children, function (child) {
        return child.hasAttribute("data-reveal");
      });
      var index = siblings.indexOf(el);
      if (index > 0) el.style.transitionDelay = Math.min(index, 5) * 70 + "ms";
      el.classList.add("reveal-pending");
      observer.observe(el);
    });
  }
  applyMotion();

  /* ------------------------------------------------------------------
     Tabs (capabilities). Without JavaScript all panels are visible.
     ------------------------------------------------------------------ */
  doc.querySelectorAll("[data-tabs]").forEach(function (widget) {
    var tablist = widget.querySelector("[data-tablist]");
    var tabs = Array.prototype.slice.call(widget.querySelectorAll('[role="tab"]'));
    if (!tablist || !tabs.length) return;
    tablist.hidden = false;

    function select(tab, focus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        var panel = doc.getElementById(t.getAttribute("aria-controls"));
        panel.hidden = !selected;
        panel.classList.toggle("is-active", selected);
      });
      if (focus) {
        tab.focus();
        tab.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        select(tab, false);
        track("capability_tab", { tab: tab.textContent });
      });
      tab.addEventListener("keydown", function (event) {
        var next;
        if (event.key === "ArrowRight") next = (i + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        select(tabs[next], true);
      });
    });
    widget.querySelectorAll("[data-panel]").forEach(function (panel) {
      panel.tabIndex = 0;
    });
    select(tabs[0], false);
  });

  /* ------------------------------------------------------------------
     Engagement model picker
     ------------------------------------------------------------------ */
  doc.querySelectorAll("[data-engagement]").forEach(function (widget) {
    var picker = widget.querySelector("[data-fit-picker]");
    if (!picker) return;
    var result = picker.querySelector("[data-fit-result]");
    picker.hidden = false;
    picker.addEventListener("change", function (event) {
      var id = event.target.value;
      var match = widget.querySelector('[data-model="' + id + '"]');
      widget.classList.add("has-match");
      widget.querySelectorAll("[data-model]").forEach(function (card) {
        card.classList.toggle("is-match", card === match);
      });
      if (match) {
        result.textContent = "Best fit: " + match.querySelector("h2, h3").textContent + ".";
        track("engagement_fit", { model: id });
      }
    });
  });

  /* ------------------------------------------------------------------
     Inquiry forms: validation, prefill, submission state, success
     ------------------------------------------------------------------ */
  var MESSAGES = {
    name: "Enter your full name.",
    email: "Enter a valid work email address, like name@company.com.",
    company: "Enter your company name.",
    message: "Add a short description, at least 20 characters.",
    inquiry_type: "Choose what we can help with.",
    partnership_type: "Choose a partnership model.",
    website: "Enter a full web address, starting with https://.",
  };

  function fieldMessage(control, field) {
    var name = control.name;
    var v = control.validity;
    var missing = v.valueMissing || (control.required && !control.value.trim());
    if (name === "email" && !missing) return MESSAGES.email;
    if (name === "website" && !missing) return MESSAGES.website;
    if (name === "company" && field.querySelector("label").textContent.indexOf("Firm") === 0) return "Enter your firm name.";
    if (name === "message" && v.tooShort) return MESSAGES.message;
    if (name === "message" && missing)
      return control.form.getAttribute("data-form") === "partnership"
        ? "Tell us a little about your firm and the work you deliver."
        : "Add a short description of your project.";
    if (MESSAGES[name]) return MESSAGES[name];
    var label = field.querySelector(".field__label");
    return (label ? label.firstChild.textContent.trim() : "This field") + " is required.";
  }

  function validateField(field) {
    var controls = Array.prototype.slice.call(field.querySelectorAll("input, select, textarea"));
    var error = field.querySelector("[data-error]");
    var invalid = null;
    if (field.hasAttribute("data-choice")) {
      var required = field.hasAttribute("data-required");
      var checked = controls.some(function (c) {
        return c.checked;
      });
      if (required && !checked) invalid = controls[0];
    } else {
      controls.forEach(function (c) {
        if (invalid) return;
        var blank = c.required && !c.value.trim();
        if (blank || !c.checkValidity()) invalid = c;
      });
    }
    field.classList.toggle("field--invalid", !!invalid);
    controls.forEach(function (c) {
      if (invalid) c.setAttribute("aria-invalid", "true");
      else c.removeAttribute("aria-invalid");
    });
    if (error) {
      error.hidden = !invalid;
      error.textContent = invalid ? fieldMessage(invalid, field) : "";
    }
    return invalid ? { control: invalid, message: error ? error.textContent : "" } : null;
  }

  function initForm(form) {
    var fields = Array.prototype.slice.call(form.querySelectorAll("[data-field]"));
    var summary = form.querySelector("[data-error-summary]");
    var status = form.querySelector("[data-form-status]");
    var submit = form.querySelector('button[type="submit"]');
    var label = form.querySelector("[data-submit-label]");
    var originalLabel = label.textContent;
    var formType = form.getAttribute("data-form");
    var attempted = false;
    var started = false;
    var restoreTimer;

    // Prefill from links such as /contact/?type=partnership&service=ai-ml
    var params = new URLSearchParams(window.location.search);
    var typeKey = params.get("type");
    if (typeKey) {
      var radio = form.querySelector('input[name="inquiry_type"][data-key="' + CSS.escape(typeKey) + '"]');
      if (radio) radio.checked = true;
    }
    var serviceKey = params.get("service");
    if (serviceKey) {
      var option = form.querySelector('select[name="service_interest"] option[data-key="' + CSS.escape(serviceKey) + '"]');
      if (option) option.selected = true;
    }

    form.addEventListener("focusin", function () {
      if (started) return;
      started = true;
      track("form_start", { form: formType });
    });

    fields.forEach(function (field) {
      field.addEventListener(field.hasAttribute("data-choice") ? "change" : "input", function () {
        if (attempted) validateField(field);
      });
      field.addEventListener(
        "blur",
        function () {
          if (attempted) validateField(field);
        },
        true,
      );
    });

    function restore() {
      window.clearTimeout(restoreTimer);
      form.classList.remove("is-submitting");
      form.removeAttribute("aria-busy");
      submit.disabled = false;
      label.textContent = originalLabel;
    }

    form.addEventListener("submit", function (event) {
      if (form.classList.contains("is-submitting")) {
        event.preventDefault();
        return;
      }
      attempted = true;
      var errors = fields.map(validateField).filter(Boolean);
      var list = summary.querySelector("ul");
      list.innerHTML = "";

      if (errors.length) {
        event.preventDefault();
        errors.forEach(function (err) {
          var li = doc.createElement("li");
          var a = doc.createElement("a");
          a.href = "#" + (err.control.id || "");
          a.textContent = err.message;
          a.addEventListener("click", function (e) {
            e.preventDefault();
            err.control.focus();
          });
          li.appendChild(a);
          list.appendChild(li);
        });
        summary.hidden = false;
        summary.focus();
        track("form_validation_error", { form: formType, count: errors.length });
        return;
      }

      summary.hidden = true;
      var subject = form.querySelector("[data-subject]");
      var typeInput = form.querySelector('[name="inquiry_type"]:checked') || form.querySelector('input[type="hidden"][name="inquiry_type"]');
      var company = form.querySelector('[name="company"]');
      if (subject) {
        subject.value =
          form.getAttribute("data-subject-prefix") +
          ": " +
          (typeInput ? typeInput.value : "General") +
          (company && company.value ? " — " + company.value.slice(0, 80) : "");
      }

      form.classList.add("is-submitting");
      form.setAttribute("aria-busy", "true");
      label.textContent = "Sending…";
      // Disable after the browser has started the native submission.
      window.setTimeout(function () {
        submit.disabled = true;
      }, 0);
      status.hidden = false;
      status.textContent = "Opening a short verification step to send your message…";
      track("form_submit", { form: formType, inquiry_type: typeInput ? typeInput.value : "" });
      try {
        window.sessionStorage.setItem("cd-pending-form", formType);
      } catch (e) {}
      restoreTimer = window.setTimeout(function () {
        restore();
        status.textContent = "Still here? Please try again, or email hello@coastlinedigital.net directly.";
      }, 15000);
    });

    window.addEventListener("pageshow", function (event) {
      if (!event.persisted) return;
      restore();
      status.hidden = true;
    });
  }

  doc.querySelectorAll("form[data-form]").forEach(initForm);

  // Returning from the form provider with ?sent=1
  (function showSuccess() {
    var params = new URLSearchParams(window.location.search);
    if (params.get("sent") !== "1") return;
    var panel = doc.querySelector("[data-form-success]");
    if (!panel) return;
    panel.hidden = false;
    var formType = null;
    try {
      formType = window.sessionStorage.getItem("cd-pending-form");
      window.sessionStorage.removeItem("cd-pending-form");
    } catch (e) {}
    track("form_submitted", { form: formType || "unknown" });
    var form = panel.parentElement.querySelector("form");
    if (form) form.hidden = true;
    params.delete("sent");
    var query = params.toString();
    window.history.replaceState(null, "", window.location.pathname + (query ? "?" + query : "") + window.location.hash);
    window.setTimeout(function () {
      panel.scrollIntoView({ block: "center", behavior: reduceMotion.matches ? "auto" : "smooth" });
      panel.focus({ preventScroll: true });
    }, 60);
  })();

  doc.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  consentBanner();
})();
