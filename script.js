
// ========================================== */
/* 1. GLOBAL SITE & NAVIGATION LOGIC          */
/* ========================================== */

const menuBtn = document.querySelector("#menu-btn");
const backdrop = document.querySelector("#backdrop");
const closeBtn = document.querySelector("#close-btn");
const drawer = document.querySelector("#drawer");
const scrollTopBtn = document.querySelector("#scroll-top-btn");

if (menuBtn && drawer && backdrop) {
  const openDrawer = () => {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    menuBtn.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
  };

  const closeDrawer = () => {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
    menuBtn.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
  };

  menuBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ========================================== */
/* 2. PROJECTS DATA REPOSITORY                */
/* ========================================== */

const projectsData = {
  "java-project-1": {
    title: "Java Project 1",
    tag: "01 / JAVASCRIPT APPLICATION",
    subtitle: "Interactive logic and dynamic browser features",
    purpose:
      "A custom JavaScript application built to explore core programming concepts, DOM manipulation, and dynamic user interactions.",
    liveUrl: "https://tobi2007.github.io/java-project-1/",
    images: [
      { src: "assets/watch-site-home.png", label: "Overview" },
      { src: "assets/watch-site.png", label: "Interface" },
    ],
  },
  "louis-vuitton-clone": {
    title: "Louis Vuitton Clone",
    tag: "02 / E-COMMERCE UI",
    subtitle: "Luxury fashion layout and editorial design",
    purpose:
      "A high-end replica of the Louis Vuitton web interface, focusing on sleek typography, luxury aesthetics, and responsive grid layouts.",
    liveUrl: "https://tobi2007.github.io/louis-vuitton-clone/",
    images: [
      { src: "assets/louis-vutton-home.png", label: "Homepage" },
      { src: "assets/louis-vutton.png", label: "Catalog" },
    ],
  },
  bmw_rep: {
    title: "BMW Replica",
    tag: "03 / AUTOMOTIVE SHOWCASE",
    subtitle: "Sleek vehicular branding and structured presentation",
    purpose:
      "A polished front-end replica celebrating automotive design, highlighting clean structural components and immersive visual styling.",
    liveUrl: "https://tobi2007.github.io/bmw_rep/",
    images: [
      { src: "assets/bmw-home.png", label: "Showcase" },
      { src: "assets/bmw.png", label: "Details" },
    ],
  },
  "spotify-premium-page-clone": {
    title: "Spotify Premium Clone",
    tag: "04 / STREAMING PLATFORM UI",
    subtitle: "Modern subscription landing page experience",
    purpose:
      "A pixel-conscious recreation of Spotify's Premium subscription landing page, featuring sleek marketing layout blocks and responsive pricing cards.",
    liveUrl: "https://tobi2007.github.io/spotify-premium-page-clone/",
    images: [
      { src: "assets/spotify-home.png", label: "Landing" },
      { src: "assets/spotify.png", label: "Plans" },
    ],
  },
  "github-pricing-clone": {
    title: "GitHub Pricing Clone",
    tag: "05 / DEVELOPER PLATFORM UI",
    subtitle: "Clean tier comparison and developer-focused styling",
    purpose:
      "An accurate front-end replication of GitHub's pricing and tier comparison interface, emphasizing clean tables and card components.",
    liveUrl: "https://tobi2007.github.io/github-pricing-clone/",
    images: [
      { src: "assets/github-home.png", label: "Pricing Table" },
      { src: "assets/github.png", label: "Features" },
    ],
  },
};

// ========================================== */
/* 3. DYNAMIC PDP BINDING LOGIC               */
/* ========================================== */

const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id") || "java-project-1"; // Valid fallback ID

const currentProject = projectsData[projectId] || projectsData["java-project-1"];

if (document.getElementById("project-title")) {
  document.getElementById("page-title").textContent =
    `${currentProject.title} — Project Details`;
  document.getElementById("project-tag").textContent = currentProject.tag;
  document.getElementById("project-title").textContent = currentProject.title;
  document.getElementById("project-subtitle").textContent =
    currentProject.subtitle;
  document.getElementById("project-purpose").textContent =
    currentProject.purpose;
  document.getElementById("live-project-btn").href = currentProject.liveUrl;

  const mainImage = document.getElementById("main-project-image");
  const thumbContainer = document.getElementById("thumbnail-container"); // Fixed ID match

  if (currentProject.images && currentProject.images.length > 0) {
    mainImage.src = currentProject.images[0].src;
    mainImage.alt = `${currentProject.title} - ${currentProject.images[0].label} view`; // Fixed variable reference

    thumbContainer.innerHTML = "";
    currentProject.images.forEach((imgObj, index) => {
      const thumbBtn = document.createElement("button");

      thumbBtn.className = index === 0 ? "thumb-item active" : "thumb-item"; // Fixed spelling ("active")

      thumbBtn.onclick = function () {
        swapImage(imgObj.src, this);
      };

      thumbBtn.innerHTML = `
        <img src="${imgObj.src}" alt="${currentProject.title} ${imgObj.label} thumbnail" />
        <span>${imgObj.label}</span>
      `;

      thumbContainer.appendChild(thumbBtn);
    });
  }
}

// ========================================== */
/* 4. INTERACTION FUNCTIONS                   */
/* ========================================== */

function swapImage(imageSrc, element) {
  const mainImage = document.getElementById("main-project-image");
  if (mainImage) {
    mainImage.src = imageSrc;
  }

  const thumbnails = document.querySelectorAll(".thumb-item");
  thumbnails.forEach((thumb) => thumb.classList.remove("active"));

  if (element) {
    element.classList.add("active");
  }
}

// Handle project feedback form submission cleanly via event listener
const feedbackForm = document.getElementById("project-feedback-form");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", (event) => {
    // Stops the browser from reloading the page
    event.preventDefault();

    const textarea = document.getElementById("project-feedback-textarea");
    const successMsg = document.getElementById("feedback-success-msg");

    if (!textarea || !textarea.value.trim()) {
      alert("Please type some feedback before submitting.");
      return;
    }

    if (successMsg) {
      // Show smooth inline success message
      successMsg.textContent = "✓ Thank you! Feedback recorded.";
      successMsg.style.opacity = "1";

      // Clear the textarea
      textarea.value = "";

      // Hide the success message after 4 seconds
      setTimeout(() => {
        successMsg.style.opacity = "0";
      }, 4000);
    }
  });
}

// ========================================== */
/* 5. DARK/LIGHT THEME INITIALIZATION & STORAGE */
/* ========================================== */

const savedTheme = localStorage.getItem("portfolio_theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
} else if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}