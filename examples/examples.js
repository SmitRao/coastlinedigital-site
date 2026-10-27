/** Progressive enhancement for the fictional concept gallery. */
(function () {
  "use strict";
  var filters = document.querySelector(".concept-filters");
  var cards = Array.from(document.querySelectorAll("[data-industry]"));
  var count = document.querySelector(".concept-count");
  if (!filters || !cards.length || !count) return;
  var buttons = Array.from(filters.querySelectorAll("[data-filter]"));

  function showIndustry(industry) {
    var visible = 0;
    cards.forEach(function (card) {
      card.hidden = industry !== "all" && card.dataset.industry !== industry;
      if (!card.hidden) visible += 1;
    });
    buttons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === industry),
      );
    });
    count.textContent =
      visible +
      " fictional concept" +
      (visible === 1 ? "" : "s") +
      " to explore";
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      showIndustry(button.dataset.filter);
    });
  });
  filters.hidden = false;

  // A direct concept link should remain reachable after changing the filter.
  function revealLinkedConcept() {
    var linked = cards.find(function (card) {
      return "#" + card.id === window.location.hash;
    });
    if (linked && linked.hidden) {
      showIndustry("all");
      linked.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }
  window.addEventListener("hashchange", revealLinkedConcept);
  revealLinkedConcept();

  // Keep multiple previews from playing over one another.
  var videos = Array.from(document.querySelectorAll(".ad-card video"));
  videos.forEach(function (video) {
    video.addEventListener("play", function () {
      videos.forEach(function (other) {
        if (other !== video) other.pause();
      });
    });
  });
  var drawer = document.querySelector(".campaign-kit__drawer");
  if (drawer)
    drawer.addEventListener("toggle", function () {
      if (!drawer.open)
        videos.forEach(function (video) {
          video.pause();
        });
    });
})();
