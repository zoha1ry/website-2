(function () {
  // —— Theme toggle ——
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  var KEY = "zk-portfolio-theme";
  var stored = localStorage.getItem(KEY);

  if (stored !== "dark" && stored !== "light") {
    stored = "light";
    localStorage.setItem(KEY, "light");
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);
    if (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }

  apply(stored);

  if (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
    });
  }

  // —— Lazy load images ——
  var images = document.querySelectorAll(".film-box img[loading='lazy']");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.addEventListener("load", function() {
            img.classList.add("loaded");
          });
          img.addEventListener("error", function() {
            img.classList.add("loaded"); // remove shimmer even on error
          });
          // If already cached/loaded
          if (img.complete) img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    }, { rootMargin: "100px" });

    images.forEach(function(img) {
      observer.observe(img);
    });
  } else {
    // Fallback — just mark all loaded
    images.forEach(function(img) {
      img.classList.add("loaded");
    });
  }
})();
