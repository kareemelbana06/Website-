const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
const hero = document.querySelector(".hero");

if (hero) requestAnimationFrame(() => hero.classList.add("is-visible"));

function closeDropdowns(except = null) {
  document.querySelectorAll(".has-dropdown.is-open").forEach((item) => {
    if (item !== except) {
      item.classList.remove("is-open");
      item.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
    }
  });
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
  navigation.classList.toggle("is-open", !isOpen);
  if (isOpen) closeDropdowns();
});

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const item = toggle.closest(".has-dropdown");
    const isOpen = item.classList.contains("is-open");
    closeDropdowns(item);
    item.classList.toggle("is-open", !isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });
});

document.querySelectorAll(".has-dropdown").forEach((item) => {
  const toggle = item.querySelector(".dropdown-toggle");
  const openDropdown = () => {
    if (!window.matchMedia("(min-width: 901px)").matches) return;
    closeDropdowns(item);
    item.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };
  const closeDropdown = () => {
    item.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  item.addEventListener("pointerenter", openDropdown);
  item.addEventListener("pointerleave", closeDropdown);
  item.addEventListener("focusin", openDropdown);
  item.addEventListener("focusout", (event) => {
    if (!item.contains(event.relatedTarget)) closeDropdown();
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".primary-navigation")) closeDropdowns();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDropdowns();
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  }
});
