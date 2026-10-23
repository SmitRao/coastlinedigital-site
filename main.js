/** Coastline Digital — accessible navigation, illustrative workflows, contact. */
(function () {
  "use strict";
  var reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav__toggle");
  var navMenu = document.querySelector(".nav__menu");
  var mobileQuery = window.matchMedia("(max-width: 700px)");

  function scrollBehavior() {
    return reduceQuery.matches ? "auto" : "smooth";
  }
  function closeMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("nav__menu--open");
  }
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") !== "true";
      navToggle.setAttribute("aria-expanded", String(open));
      navMenu.classList.toggle("nav__menu--open", open);
    });
    navMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        navToggle.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu();
        navToggle.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target)) closeMenu();
    });
    if (mobileQuery.addEventListener)
      mobileQuery.addEventListener("change", closeMenu);
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var target = document.getElementById(
        anchor.getAttribute("href").slice(1),
      );
      if (!target) return;
      event.preventDefault();
      closeMenu();
      var top =
        target.getBoundingClientRect().top +
        window.scrollY -
        (nav ? nav.offsetHeight : 0) -
        20;
      window.scrollTo({ top: Math.max(0, top), behavior: scrollBehavior() });
      window.history.pushState(null, "", anchor.getAttribute("href"));
      if (!target.hasAttribute("tabindex"))
        target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  // This local demonstration illustrates a possible workflow; it does not process data.
  var tabs = Array.from(document.querySelectorAll("[data-scenario]"));
  var runButton = document.getElementById("run-demo");
  var demoStatus = document.getElementById("demo-status");
  var demoTimers = [];
  var running = false;
  var scenarioNotes = {
    operations: "Your systems. A more connected workflow.",
    documents: "Your documents. Useful context for your team.",
    experiences: "Your customers. A more connected experience.",
  };
  function activePanel() {
    return document.querySelector(".workflow-panel:not([hidden])");
  }
  function resetDemo() {
    demoTimers.forEach(window.clearTimeout);
    demoTimers = [];
    running = false;
    document.querySelectorAll(".demo-step").forEach(function (step) {
      step.classList.remove("is-running", "is-complete");
    });
    if (runButton) {
      runButton.disabled = false;
      runButton.removeAttribute("aria-busy");
      runButton.querySelector("span").textContent = "Run example";
    }
  }
  function activateTab(tab, focus) {
    resetDemo();
    tabs.forEach(function (item) {
      var selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      var panel = document.getElementById(item.getAttribute("aria-controls"));
      if (panel) panel.hidden = !selected;
    });
    if (demoStatus)
      demoStatus.textContent = scenarioNotes[tab.dataset.scenario];
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activateTab(tab, false);
    });
    tab.addEventListener("keydown", function (event) {
      var next;
      if (event.key === "ArrowDown" || event.key === "ArrowRight")
        next = (index + 1) % tabs.length;
      if (event.key === "ArrowUp" || event.key === "ArrowLeft")
        next = (index + tabs.length - 1) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        activateTab(tabs[next], true);
      }
    });
  });
  if (runButton) {
    runButton.addEventListener("click", function () {
      if (running || !activePanel()) return;
      resetDemo();
      running = true;
      runButton.disabled = true;
      runButton.setAttribute("aria-busy", "true");
      runButton.querySelector("span").textContent = "Running…";
      var steps = Array.from(activePanel().querySelectorAll(".demo-step"));
      var duration = reduceQuery.matches ? 350 : 850;
      function advance(index) {
        if (index > 0) {
          steps[index - 1].classList.remove("is-running");
          steps[index - 1].classList.add("is-complete");
        }
        if (index < steps.length) {
          steps[index].classList.add("is-running");
          demoStatus.textContent =
            "Example: " +
            steps[index].querySelector("strong").textContent.toLowerCase() +
            "…";
          demoTimers.push(
            window.setTimeout(function () {
              advance(index + 1);
            }, duration),
          );
        } else {
          running = false;
          runButton.disabled = false;
          runButton.removeAttribute("aria-busy");
          runButton.querySelector("span").textContent = "Run again";
          demoStatus.textContent =
            "Example complete. Ready for your team’s review.";
        }
      }
      advance(0);
    });
  }

  // Keep the existing FormSubmit handoff, including its verification challenge.
  var contactForm = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");
  var submitTimer;
  function restoreSubmit() {
    if (!contactForm) return;
    window.clearTimeout(submitTimer);
    contactForm.classList.remove("is-submitting");
    contactForm.removeAttribute("aria-busy");
    var button = contactForm.querySelector('button[type="submit"]');
    if (button) button.disabled = false;
    var label = contactForm.querySelector(".submit-label");
    if (label) label.textContent = "Start the conversation";
  }
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      if (contactForm.classList.contains("is-submitting")) {
        event.preventDefault();
        return;
      }
      var submit = contactForm.querySelector('button[type="submit"]');
      contactForm.classList.add("is-submitting");
      contactForm.setAttribute("aria-busy", "true");
      submit.disabled = true;
      contactForm.querySelector(".submit-label").textContent =
        "Opening secure form…";
      formStatus.textContent =
        "Continue on the next screen to verify and send your message.";
      formStatus.hidden = false;
      submitTimer = window.setTimeout(function () {
        restoreSubmit();
        formStatus.textContent =
          "Still here? Try again, or email hello@coastlinedigital.net directly.";
      }, 15000);
    });
    window.addEventListener("pageshow", function (event) {
      if (!event.persisted) return;
      restoreSubmit();
      if (formStatus) formStatus.hidden = true;
    });
  }
  if (new URLSearchParams(window.location.search).get("sent") === "1") {
    var success = document.getElementById("success-message");
    if (success) {
      success.hidden = false;
      window.setTimeout(function () {
        document
          .getElementById("contact")
          .scrollIntoView({ behavior: scrollBehavior(), block: "start" });
      }, 100);
      var cleanURL = new URL(window.location.href);
      cleanURL.searchParams.delete("sent");
      window.history.replaceState(
        null,
        "",
        cleanURL.pathname + cleanURL.search + "#contact",
      );
    }
  }
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
