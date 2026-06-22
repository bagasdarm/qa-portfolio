"use strict";

/**
 * PRELOADER
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/**
 * add event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * Mobile navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

addEventOnElements(navTogglers, "click", function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
});

addEventOnElements(navLinks, "click", function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
});

/**
 * Header active
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  header.classList[window.scrollY > 100 ? "add" : "remove"]("active");
});

/**
 * Element tilt effect
 */

const tiltElements = document.querySelectorAll("[data-tilt]");

const initTilt = function (event) {
  /** get tilt element center position */
  const centerX = this.offsetWidth / 2;
  const centerY = this.offsetHeight / 2;

  const tiltPosY = ((event.offsetX - centerX) / centerX) * 10;
  const tiltPosX = ((event.offsetY - centerY) / centerY) * 10;

  this.style.transform = `perspective(1000px) rotateX(${tiltPosX}deg) rotateY(${tiltPosY - tiltPosY * 2}deg)`;
};

addEventOnElements(tiltElements, "mousemove", initTilt);

addEventOnElements(tiltElements, "mouseout", function () {
  this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});

/**
 * Tab content
 */

const tabBtns = document.querySelectorAll("[data-tab-btn]");
const tabContents = document.querySelectorAll("[data-tab-content]");

let lastActiveTabBtn = tabBtns[0];
let lastActiveTabContent = tabContents[0];

const filterContent = function () {
  if (!(lastActiveTabBtn === this)) {
    lastActiveTabBtn.classList.remove("active");
    lastActiveTabContent.classList.remove("active");

    this.classList.add("active");
    lastActiveTabBtn = this;

    const currentTabContent = document.querySelector(
      `[data-tab-content="${this.dataset.tabBtn}"]`,
    );

    currentTabContent.classList.add("active");
    lastActiveTabContent = currentTabContent;
  }
};

addEventOnElements(tabBtns, "click", filterContent);

/**
 * Custom cursor
 */

const cursors = document.querySelectorAll("[data-cursor]");
const hoveredElements = [
  ...document.querySelectorAll("button"),
  ...document.querySelectorAll("a"),
];

window.addEventListener("mousemove", function (event) {
  const posX = event.clientX;
  const posY = event.clientY;

  /** cursor dot position */
  cursors[0].style.left = `${posX}px`;
  cursors[0].style.top = `${posY}px`;

  /** cursor outline position */
  setTimeout(function () {
    cursors[1].style.left = `${posX}px`;
    cursors[1].style.top = `${posY}px`;
  }, 80);
});

/** add hovered class when mouseover on hoverElements */
addEventOnElements(hoveredElements, "mouseover", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.add("hovered");
  }
});

/** remove hovered class when mouseout on hoverElements */
addEventOnElements(hoveredElements, "mouseout", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.remove("hovered");
  }
});

/**
 * ==========================================
 * DYNAMIC PROJECTS FROM JSON & SLIDER LOGIC
 * ==========================================
 */
let projectsData = {}; // Akan menyimpan data untuk modal
const projectSlider = document.getElementById("projectSlider");

// 1. Ambil data dari JSON
fetch("./assets/data/projects.json")
  .then((response) => response.json())
  .then((data) => {
    let htmlContent = "";

    data.forEach((project) => {
      // Simpan data ke object agar bisa dipanggil oleh Modal
      projectsData[project.id] = project;

      // Generate HTML Card untuk setiap project
      htmlContent += `
        <li class="slider-item">
          <div class="project-card text-center glass-card">
            <div class="card-banner img-holder has-before" style="--width: 1000; --height: 763">
              <img src="${project.image}" width="1000" height="763" loading="lazy" alt="${project.title}" class="img-cover" />
              <button class="btn btn:hover open-modal-btn" data-project="${project.id}">
                <span class="span">Project Details</span>
                <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
              </button>
            </div>
            <div class="card-content">
              <p class="card-subtitle">${project.category}</p>
              <h3 class="title h3"><span class="card-title">${project.title}</span></h3>
            </div>
          </div>
        </li>
      `;
    });

    // Inject HTML ke dalam slider
    if (projectSlider) projectSlider.innerHTML = htmlContent;

    // Pasang Event Listener untuk tombol Modal setelah HTML terbuat
    const openModalBtns = document.querySelectorAll(".open-modal-btn");
    openModalBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute("data-project");
        openProjectModal(projectId);
      });
    });
  })
  .catch((error) => console.error("Error fetching projects:", error));


// 2. Logika Navigasi Slider (Geser Kiri/Kanan)
const sliderPrev = document.getElementById("sliderPrev");
const sliderNext = document.getElementById("sliderNext");

if (sliderPrev && sliderNext && projectSlider) {
  sliderPrev.addEventListener("click", () => {
    // Geser ke kiri sejauh lebar 1 kartu + gap 30px
    const scrollAmount = projectSlider.children[0].offsetWidth + 30;
    projectSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  sliderNext.addEventListener("click", () => {
    // Geser ke kanan
    const scrollAmount = projectSlider.children[0].offsetWidth + 30;
    projectSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}

// 3. Logika Modal Pop-up (Sama seperti sebelumnya)
const projectModal = document.getElementById("projectModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalDynamicBody = document.getElementById("modalDynamicBody");

const openProjectModal = (projectId) => {
  const data = projectsData[projectId];
  if (!data) return;

  let buttonsHtml = "";
  if (data.buttons && data.buttons.length > 0) {
    data.buttons.forEach((btn) => {
      buttonsHtml += `
        <a href="${btn.url}" target="_blank" class="btn btn:hover" style="height: 50px; font-size: 1.1rem; padding-inline: 25px;">
          <span class="span">${btn.label}</span>
          <ion-icon name="${btn.icon}" aria-hidden="true"></ion-icon>
        </a>
      `;
    });
  }

  modalDynamicBody.innerHTML = `
    <img src="${data.image}" alt="${data.title}" class="modal-banner">
    <span class="modal-category">${data.category}</span>
    <h2 class="title h2 modal-title-text">${data.title}</h2>
    <p class="modal-description">${data.description}</p>
    <div class="modal-action-area">
      ${buttonsHtml}
    </div>
  `;

  projectModal.classList.add("active");
  document.body.style.overflow = "hidden"; // Kunci scroll background
};

const closeProjectModal = () => {
  projectModal.classList.remove("active");
  document.body.style.overflow = "auto";
  setTimeout(() => {
    if (!projectModal.classList.contains("active")) {
      modalDynamicBody.innerHTML = "";
    }
  }, 300);
};

if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProjectModal);
if (modalOverlay) modalOverlay.addEventListener("click", closeProjectModal);

// ==========================================
// AUTO-SLIDE LOGIC UNTUK PROJECT SLIDER
// ==========================================

// Tunggu sebentar agar fetch data selesai dan HTML terbuat
setTimeout(() => {
  const projectSlider = document.getElementById("projectSlider");

  if (projectSlider) {
    const autoSlideDelay = 3000; // Ganti angka ini untuk mengatur kecepatan (3000 = 3 detik)
    let autoSlideInterval;

    const startAutoSlide = () => {
      autoSlideInterval = setInterval(() => {
        // Ambil elemen kartu pertama untuk menghitung jarak geser
        const firstCard = projectSlider.querySelector(".slider-item");
        if (!firstCard) return;

        const scrollAmount = firstCard.offsetWidth + 30; // Lebar kartu + gap (30px)

        // Cek apakah slider sudah mentok di ujung kanan
        // Jika sudah mentok, kembalikan ke awal. Jika belum, geser ke kanan.
        if (projectSlider.scrollLeft + projectSlider.clientWidth >= projectSlider.scrollWidth - 1) {
          projectSlider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          projectSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }, autoSlideDelay);
    };

    const stopAutoSlide = () => {
      clearInterval(autoSlideInterval);
    };

    // 1. Mulai auto-slide pertama kali
    startAutoSlide();

    // 2. Hentikan auto-slide saat mouse menyorot kartu (agar tombol details mudah diklik)
    projectSlider.addEventListener("mouseenter", stopAutoSlide);

    // 3. Jalankan kembali auto-slide saat mouse pergi
    projectSlider.addEventListener("mouseleave", startAutoSlide);
    
    // (Opsional) Untuk pengguna HP/Touchscreen, berhenti saat disentuh
    projectSlider.addEventListener("touchstart", stopAutoSlide);
    projectSlider.addEventListener("touchend", startAutoSlide);
  }
}, 1000); // Timeout 1 detik memastikan data dari JSON sudah masuk ke HTML