// ========================================
// Hebergratuit - Main JavaScript
// ========================================

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

function toggleDropdown(dropdown) {
  if (!dropdown) return;

  const isOpen = dropdown.classList.contains("is-open");

  // Close all other dropdowns first
  closeAllDropdowns(dropdown);

  // Toggle current dropdown
  if (isOpen) {
    closeDropdown(dropdown);
  } else {
    dropdown.classList.add("is-open");

    const toggle = dropdown.querySelector(".dropdown-toggle");

    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
    }
  }
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
// Dropdown Click
// ========================================

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const dropdown = toggle.closest(".has-dropdown");

    if (!dropdown) return;

    toggleDropdown(dropdown);
  });
});

// ========================================
// Desktop Hover
// ========================================

dropdownItems.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");

  if (!toggle) return;

  dropdown.addEventListener("mouseenter", () => {
    // Hover only on desktop
    if (window.innerWidth <= 900) return;

    closeAllDropdowns(dropdown);

    dropdown.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  });

  dropdown.addEventListener("mouseleave", () => {
    // Hover only on desktop
    if (window.innerWidth <= 900) return;

    closeDropdown(dropdown);
  });
});

// ========================================
// Close Dropdown When Clicking Outside
// ========================================

document.addEventListener("click", (event) => {
  const clickedInsideNavigation =
    navigation && navigation.contains(event.target);

  if (!clickedInsideNavigation) {
    closeAllDropdowns();
  }
});

// ========================================
// Close Menu / Dropdown With Escape
// ========================================

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  // Close dropdowns
  closeAllDropdowns();

  // Close mobile menu
  if (navigation) {
    navigation.classList.remove("is-open");
  }

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  }
});

// ========================================
// Handle Window Resize
// ========================================

window.addEventListener("resize", () => {
  // When switching to desktop
  if (window.innerWidth > 900) {
    if (navigation) {
      navigation.classList.remove("is-open");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    }
  }

  // When switching to mobile
  if (window.innerWidth <= 900) {
    closeAllDropdowns();
  }
});
