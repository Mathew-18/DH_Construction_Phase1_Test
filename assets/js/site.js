// The static menu stays available when JavaScript is disabled.
(() => {
  const header = document.querySelector(".dh-header");
  const toggle = header.querySelector(".dh-toggle");
  const services = header.querySelector(".dh-services");
  const summary = services.querySelector("summary");
  const mobile = window.matchMedia("(max-width: 991px)");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    if (!open) services.open = false;
  }

  function resetLayout() {
    setMenu(false);
    toggle.hidden = !mobile.matches;
  }

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("click", event => {
    if (!services.contains(event.target)) services.open = false;
    if (!header.contains(event.target)) setMenu(false);
  });

  header.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (services.open) {
      services.open = false;
      summary.focus();
    } else if (mobile.matches && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });

  header.addEventListener("focusout", event => {
    if (!services.contains(event.relatedTarget)) services.open = false;
    if (!header.contains(event.relatedTarget)) setMenu(false);
  });

  mobile.addEventListener("change", resetLayout);
  window.addEventListener("pageshow", resetLayout);
  resetLayout();
})();
