(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  var themeButtons = document.querySelectorAll("[data-theme-toggle]");
  var root = document.documentElement;
  var theme = root.dataset.theme;
  if (!theme) {
    theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setTheme(nextTheme, save) {
    theme = nextTheme;
    root.dataset.theme = theme;
    var nextLabel = theme === "dark" ? "Light mode" : "Dark mode";
    themeButtons.forEach(function (button) {
      button.textContent = nextLabel;
      button.setAttribute("aria-label", "Switch to " + nextLabel.toLowerCase());
      button.setAttribute("aria-pressed", String(theme === "dark"));
    });
    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#0b1020" : "#f5f8fc");
    if (save) {
      try { localStorage.setItem("site-theme", theme); } catch (error) { /* Theme remains active for this page. */ }
    }
  }

  setTheme(theme, false);
  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setTheme(theme === "dark" ? "light" : "dark", true);
    });
  });
})();
