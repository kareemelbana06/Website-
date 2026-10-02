// ========================================
// Hebergratuit - Main JavaScript
// ========================================

// ----------------------------------------
// Elements
// ----------------------------------------

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
const dropdownItems = document.querySelectorAll(".has-dropdown");
const hero = document.querySelector(".hero");


// ========================================
// Hero Animation
// ========================================

if (hero) {
  requestAnimationFrame(() => {
    hero.classList.add("is-visible");
  });
}


// ========================================
// Dropdown Helpers
// ========================================

function closeDropdown(dropdown) {
  if (!dropdown) return;

  dropdown.classList.remove("is-open");

  const toggle = dropdown.querySelector(".dropdown-toggle");

  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
  }
}


function closeAllDropdowns(except = null) {
  dropdownItems.forEach((dropdown) => {
    if (dropdown !== except) {
      closeDropdown(dropdown);
    }
  });
}


// ========================================
// Mobile Menu
// ========================================

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      // Close mobile menu
      navigation.classList.remove("is-open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Ouvrir le menu");

      // Close all dropdowns
      closeAllDropdowns();

    } else {
      // Open mobile menu
      navigation.classList.add("is-open");

      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Fermer le menu");
    }
  });
}


// ========================================
// Mobile Dropdown
// ========================================

dropdownToggles.forEach((toggle) => {

  toggle.addEventListener("click", (event) => {

    // Desktop doesn't use click behavior
    if (window.innerWidth > 900) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const dropdown = toggle.closest(".has-dropdown");

    if (!dropdown) return;

    const isOpen =
      dropdown.classList.contains("is-open");


    // ------------------------------------
    // If already open -> CLOSE it
    // ------------------------------------

    if (isOpen) {

      dropdown.classList.remove("is-open");

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

      return;
    }


    // ------------------------------------
    // Close other dropdowns
    // ------------------------------------

    closeAllDropdowns(dropdown);


    // ------------------------------------
    // Open current dropdown
    // ------------------------------------

    dropdown.classList.add("is-open");

    toggle.setAttribute(
      "aria-expanded",
      "true"
    );

  });

});


// ========================================
// Desktop Dropdown Hover
// ========================================

dropdownItems.forEach((dropdown) => {

  const toggle =
    dropdown.querySelector(".dropdown-toggle");


  // --------------------------------------
  // Mouse Enter
  // --------------------------------------

  dropdown.addEventListener("mouseenter", () => {

    // Only desktop
    if (window.innerWidth <= 900) {
      return;
    }

    closeAllDropdowns(dropdown);

    dropdown.classList.add("is-open");

    if (toggle) {
      toggle.setAttribute(
        "aria-expanded",
        "true"
      );
    }

  });


  // --------------------------------------
  // Mouse Leave
  // --------------------------------------

  dropdown.addEventListener("mouseleave", () => {

    // Only desktop
    if (window.innerWidth <= 900) {
      return;
    }

    dropdown.classList.remove("is-open");

    if (toggle) {
      toggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }

  });

});


// ========================================
// Close Mobile Dropdown When Clicking
// Outside
// ========================================

document.addEventListener("click", (event) => {

  // Only mobile
  if (window.innerWidth > 900) {
    return;
  }

  // If click is inside dropdown, do nothing
  if (event.target.closest(".has-dropdown")) {
    return;
  }

  // Otherwise close everything
  closeAllDropdowns();

});


// ========================================
// Escape Key
// ========================================

document.addEventListener("keydown", (event) => {

  if (event.key !== "Escape") {
    return;
  }

  // Close dropdowns
  closeAllDropdowns();


  // Close mobile menu
  if (navigation) {
    navigation.classList.remove("is-open");
  }


  if (menuToggle) {

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Ouvrir le menu"
    );

  }

});


// ========================================
// Window Resize
// ========================================

window.addEventListener("resize", () => {

  // --------------------------------------
  // Switch to Desktop
  // --------------------------------------

  if (window.innerWidth > 900) {

    if (navigation) {
      navigation.classList.remove("is-open");
    }

    if (menuToggle) {

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Ouvrir le menu"
      );

    }

  }


  // --------------------------------------
  // Switch to Mobile
  // --------------------------------------

  if (window.innerWidth <= 900) {
    closeAllDropdowns();
  }

});
