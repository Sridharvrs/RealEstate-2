/* ============================================================
   RealEstate Dashboard — shared behavior
   Sidebar modules, section switching, animations
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const modules = document.querySelectorAll(".nav-module");
  const links = document.querySelectorAll(".nav-sections a[data-panel]");
  const panels = document.querySelectorAll(".panel");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const hamburger = document.getElementById("hamburger");
  const pageTitle = document.getElementById("page-title");
  const crumb = document.getElementById("crumb");

  /* ---- Module accordion ---- */
  modules.forEach((mod) => {
    const btn = mod.querySelector(".nav-module-btn");
    btn.addEventListener("click", () => {
      const isOpen = mod.classList.contains("open");
      modules.forEach((m) => m.classList.remove("open"));
      if (!isOpen) mod.classList.add("open");
    });
  });

  /* ---- Section switching ---- */
  function activatePanel(id, link) {
    panels.forEach((p) => p.classList.remove("active"));
    const target = document.getElementById(id);
    if (!target) return;
    target.classList.add("active");

    links.forEach((l) => l.classList.remove("active"));
    if (link) link.classList.add("active");

    if (pageTitle && link) {
      const moduleName = link.closest(".nav-module").querySelector(".label").textContent.trim();
      pageTitle.textContent = link.textContent.trim();
      if (crumb) crumb.innerHTML = "Dashboard / " + moduleName + " / <b>" + link.textContent.trim() + "</b>";
    }

    animatePanel(target);
    closeSidebarMobile();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      activatePanel(link.dataset.panel, link);
    });
  });

  /* ---- Mobile sidebar ---- */
  function closeSidebarMobile() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  }
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      overlay.classList.toggle("show");
    });
  }
  if (overlay) overlay.addEventListener("click", closeSidebarMobile);

  /* ---- Animations: bars, progress, counters ---- */
  function animatePanel(scope) {
    scope.querySelectorAll(".bar[data-h]").forEach((bar, i) => {
      bar.style.height = "0";
      setTimeout(() => (bar.style.height = bar.dataset.h + "%"), 80 + i * 60);
    });
    scope.querySelectorAll(".progress > span[data-w]").forEach((p, i) => {
      p.style.width = "0";
      setTimeout(() => (p.style.width = p.dataset.w + "%"), 120 + i * 80);
    });
    scope.querySelectorAll(".stat-value[data-count]").forEach((el) => {
      const end = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const dur = 900;
      const start = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = end * eased;
        el.textContent =
          prefix + (end % 1 === 0 ? Math.round(val).toLocaleString() : val.toFixed(1)) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  /* ---- Initial state ---- */
  const first = document.querySelector(".nav-sections a.active[data-panel]") || links[0];
  if (first) {
    first.closest(".nav-module").classList.add("open");
    activatePanel(first.dataset.panel, first);
  }

  /* ---- Fake interactive touches ---- */
  document.querySelectorAll("[data-toast]").forEach((btn) => {
    btn.addEventListener("click", () => showToast(btn.dataset.toast));
  });

  function showToast(msg) {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      Object.assign(toast.style, {
        position: "fixed", bottom: "24px", right: "24px", zIndex: 100,
        background: "#0f1b3d", color: "#f0d78c", padding: "14px 22px",
        borderRadius: "12px", fontSize: "14px", fontWeight: "600",
        boxShadow: "0 8px 24px rgba(10,18,41,.35)", border: "1px solid #c9a84c",
        opacity: "0", transition: "opacity .3s, transform .3s", transform: "translateY(10px)",
      });
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    });
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
    }, 2400);
  }
});