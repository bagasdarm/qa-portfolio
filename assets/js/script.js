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
 * PROJECT MODAL & DYNAMIC CONTENT LOGIC
 * ==========================================
 */

const projectsData = {
  "1": {
    title: "Learning Management System (LMS)",
    category: "QA (Manual & Automation)",
    image: "./assets/images/projects.jpg",
    description: "Managed end-to-end testing for the PT Ragdalion Revolusi Industri internship project by designing test cases from scratch, executing manual testing, and building automation testing scripts using Katalon Studio. Updated test cases in parallel with feature updates, tracked bugs via Google Sheets, and monitored real-time push deployment status to Dev/Staging environments via Discord bot integration to expedite technical collaboration with Developers.",
    buttons: [
      { label: "View Test Cases", url: "#", icon: "document-text-outline" }
    ]
  },
  "2": {
    title: "Budget Management System (BMS)",
    category: "QA (Manual & Automation)",
    image: "./assets/images/projects.jpg",
    description: "Performed QA and integration testing on a PT Ragdalion Revolusi Industri project by optimizing 80% of legacy test cases. Executed manual and automation testing via Katalon Studio to validate core functionality and ensure the accuracy of data exchange between the internal BMS and the client's Odoo platform.",
    buttons: [
      { label: "View Scripts", url: "#", icon: "code-slash-outline" }
    ]
  },
  "3": {
    title: "Financial Order Management (FOM)",
    category: "Functional & Integration Testing",
    image: "./assets/images/projects.jpg",
    description: "Executed functional and integration testing for a PT Ragdalion Revolusi Industri project using both manual and automated testing approaches (Katalon Studio). Validated the main transaction flow connecting the QOM and ARP modules, ensuring accurate and non-redundant data transmission between FOM and the client's Odoo platform.",
    buttons: [
      { label: "Project Details", url: "#", icon: "information-circle-outline" }
    ]
  },
  "4": {
    title: "HRIS System (Web & Mobile)",
    category: "Cross-Platform Manual Testing",
    image: "./assets/images/projects.jpg",
    description: "Conducted intensive cross-platform manual testing on PT Ragdalion Revolusi Industri's integrated HRIS ecosystem. Validated end-to-end business flow synchronization, ensuring requests from the Mobile application (e.g., Maternity Leave and Overtime) synchronized perfectly with the approval processes on the Web dashboard.",
    buttons: [
      { label: "Bug Reports", url: "#", icon: "bug-outline" }
    ]
  },
  "5": {
    title: "Manufacturing Maintenance System",
    category: "Functional Testing",
    image: "./assets/images/projects.jpg",
    description: "Executed cross-platform functional testing on a template manufacturing application during the internship at PT Ragdalion Revolusi Industri. Ensured the stability of the three main feature pillars (Checklist, Corrective, Preventive Maintenance) and validated customization alignment with client requirements.",
    buttons: [
      { label: "Testing Documentation", url: "#", icon: "folder-open-outline" }
    ]
  },
  "6": {
    title: "Customer Service Chatbot Web Application",
    category: "Development & QA",
    image: "./assets/images/projects.jpg",
    description: "Designed, built, and tested a chatbot application as a personal thesis project. Developed the front-end using React Vite, designed the user interface (UI) via Figma, and implemented the back-end using Node.js to handle user authentication and CRUD operations. Conducted comprehensive functional and usability testing to ensure a user-friendly system and optimal user experience.",
    buttons: [
      { label: "GitHub Repo", url: "#", icon: "logo-github" },
      { label: "Figma Design", url: "#", icon: "color-palette-outline" }
    ]
  },
  "7": {
    title: "Online Grocery E-Commerce Web Application",
    category: "Functional Manual Testing",
    image: "./assets/images/projects.jpg",
    description: "Served as QA Tester in a 5-member development team for a university Web Programming academic project. Managed the planning and execution of functional manual testing on the e-commerce platform to validate business flow compliance. Documented all bug findings using Google Sheets to ensure application quality and support timely project completion.",
    buttons: [
      { label: "Bug Reports Sheet", url: "#", icon: "document-text-outline" }
    ]
  },
  "8": {
    title: "E-Wallet Application - UI/UX Research & Design",
    category: "UI/UX Research & Design",
    image: "./assets/images/projects.jpg",
    description: "Conducted user needs research, literature review, and UI/UX design for an e-wallet application as part of a university academic project. Collaborated within a team to design an intuitive UI using Figma and executed usability testing to validate system flow convenience and optimize user experience.",
    buttons: [
      { label: "View Figma Prototype", url: "#", icon: "logo-figma" }
    ]
  },
  "9": {
    title: "Lovebird Disease Diagnosis Expert System",
    category: "Manual UI Testing",
    image: "./assets/images/projects.jpg",
    description: "Collaborated in a team to develop and test an Expert System for a university academic project. Designed and implemented a rule-based inference engine and compiled a knowledge base based on expert data. Fully responsible for executing manual testing on the UI component to ensure accurate instant diagnosis results and system navigation ease.",
    buttons: [
      { label: "Read Abstract", url: "#", icon: "book-outline" }
    ]
  }
};

const projectModal = document.getElementById("projectModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalDynamicBody = document.getElementById("modalDynamicBody");
const openModalBtns = document.querySelectorAll(".open-modal-btn");

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
  document.body.style.overflow = "hidden";
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

openModalBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const projectId = btn.getAttribute("data-project");
    openProjectModal(projectId);
  });
});

if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProjectModal);
if (modalOverlay) modalOverlay.addEventListener("click", closeProjectModal);
