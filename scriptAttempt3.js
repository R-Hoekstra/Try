document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav");
  const menuOverlay = document.querySelector(".menu-overlay");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  let lastScrollY = window.scrollY;

  // Modal functionality
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-image");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  const images = document.querySelectorAll(".clickable-image");

  // Open modal on image click
  images.forEach((image) => {
    image.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = image.src;
      captionText.innerHTML = image.alt;
    });
  });

  // Close modal functionality
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Function to close the menu
  const closeMenu = () => {
    navMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    menuToggle.classList.remove("active");
  };

  // Highlight the active menu item
  const highlightActiveLink = (currentHref) => {
    navLinks.forEach((link) => {
      const linkHref = link.getAttribute("href");
      if (linkHref === currentHref) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  // Determine which menu item should be highlighted based on scroll position
  const updateActiveLinkOnScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section) => {
      const sectionId = section.getAttribute("id");
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        highlightActiveLink(`#${sectionId}`);
      }
    });
  };

  // Scroll behavior for header
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // Scrolling down: Hide header
      header.classList.add("hidden");
      closeMenu();
      header.style.backgroundColor = "rgba(244, 244, 244, 0)";
    } else {
      // Scrolling up: Show header
      header.classList.remove("hidden");
      header.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    }

    // Reset menu when at the top
    if (currentScrollY === 0) {
      header.style.backgroundColor = "rgba(244, 244, 244, 0)";
      closeMenu();
    }

    lastScrollY = currentScrollY;

    // Update active link based on scroll position
    updateActiveLinkOnScroll();
  });

  // Toggle menu on click
  menuToggle.addEventListener("click", () => {
    const isActive = menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active", isActive);
    menuOverlay.classList.toggle("active", isActive);
  });

  // Handle clicks on navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetHref = link.getAttribute("href");

      // Highlight the clicked link
      highlightActiveLink(targetHref);

      if (targetHref.startsWith("#")) {
        // Internal link: Scroll smoothly to section
        const targetId = targetHref.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          e.preventDefault(); // Prevent default anchor behavior
          targetSection.scrollIntoView({ behavior: "smooth" });
        } else {
          console.warn(`Section with id "${targetId}" not found.`);
        }
      } else {
        // External link: Allow navigation to new page
      }
    });
  });

  // Highlight menu item on page load
  const currentUrl = window.location.href;
  const currentHash = currentUrl.includes("#")
    ? `#${currentUrl.split("#")[1]}`
    : null;

  if (currentHash) {
    // Highlight based on hash in URL
    highlightActiveLink(currentHash);
  } else {
    // If no hash, highlight the first menu item or determine based on the current page
    const currentPath = window.location.pathname.split("/").pop();
    navLinks.forEach((link) => {
      if (
        link.getAttribute("href") === currentPath ||
        link.getAttribute("href") === `#${sections[0].id}`
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
});
