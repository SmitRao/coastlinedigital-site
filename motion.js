/** Motion is optional. All content remains visible when scripts are unavailable. */
(function () {
  "use strict";
  var reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var pauseButton = document.querySelector(".motion-toggle");
  var paused = false;
  var observer;
  var targets = Array.from(document.querySelectorAll("[data-reveal]"));
  var nav = document.querySelector(".nav");
  var progress = document.querySelector("[data-scroll-progress]");
  var bar = progress && progress.querySelector(".progress__bar");

  function settleAll() {
    if (observer) observer.disconnect();
    targets.forEach(function (el) {
      el.classList.add("is-inview");
    });
  }
  function updatePreference() {
    document.documentElement.classList.toggle(
      "motion-paused",
      paused || reduceQuery.matches,
    );
    if (paused || reduceQuery.matches) settleAll();
    if (pauseButton) {
      pauseButton.disabled = reduceQuery.matches;
      pauseButton.setAttribute(
        "aria-pressed",
        String(paused || reduceQuery.matches),
      );
      var label = reduceQuery.matches
        ? "Reduced motion enabled in device settings"
        : paused
          ? "Resume decorative animations"
          : "Pause decorative animations";
      pauseButton.setAttribute("aria-label", label);
      pauseButton.title = label;
      pauseButton.querySelector("span").textContent =
        paused || reduceQuery.matches ? "▷" : "Ⅱ";
    }
  }
  if (!reduceQuery.matches && "IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
    );
    targets.forEach(function (el) {
      // Only hide elements below the viewport, and only after observation works.
      observer.observe(el);
      if (el.getBoundingClientRect().top > window.innerHeight)
        el.classList.add("reveal-ready");
    });
  }
  if (pauseButton)
    pauseButton.addEventListener("click", function () {
      paused = !paused;
      updatePreference();
    });
  if (reduceQuery.addEventListener)
    reduceQuery.addEventListener("change", updatePreference);
  updatePreference();

  var ticking = false;
  function updateScroll() {
    ticking = false;
    if (nav) nav.classList.toggle("nav--scrolled", window.scrollY > 16);
    if (bar) {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      var fraction =
        total > 0 ? Math.max(0, Math.min(1, window.scrollY / total)) : 0;
      bar.style.transform = "scaleX(" + fraction + ")";
      if (progress.getAttribute("role") === "progressbar")
        progress.setAttribute(
          "aria-valuenow",
          String(Math.round(fraction * 100)),
        );
    }
  }
  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScroll);
    },
    { passive: true },
  );
  window.addEventListener("resize", updateScroll);
  updateScroll();
})();
