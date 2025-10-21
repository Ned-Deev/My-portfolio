// =============================
// Typing Animation (Hero Header)
// =============================
const typedTextSpan = document.querySelector("#typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
  "Web Developer",
  "Data Engineer",
  "Game Builder",
  "Creative Thinker",
];
const typingDelay = 150;
const erasingDelay = 100;
const newTextDelay = 2000;

let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (!typedTextSpan) return;
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex++);
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (!typedTextSpan) return;
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      --charIndex
    );
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex = (textArrayIndex + 1) % textArray.length;
    setTimeout(type, typingDelay + 500);
  }
}

document.addEventListener("DOMContentLoaded", type);

// =============================
// Scroll Reveal Animation
// =============================
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("hidden"); // ✅ remove 'hidden'
        entry.target.classList.add("visible"); // ✅ add 'visible'
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".section, .hero")
  .forEach((section) => observer.observe(section));

// =============================
// Back to Top Button
// =============================
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (backToTop) {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  }

  document.querySelectorAll(".section").forEach((section) => {
    if (section.getBoundingClientRect().top < window.innerHeight - 100) {
      section.classList.add("visible");
    }
  });
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =============================
// Project Filter Logic (optional)
// =============================
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll("#project-list .project");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projects.forEach((project) => {
      const match = filter === "all" || project.dataset.category === filter;
      project.style.display = match ? "block" : "none";
    });
  });
});

// =============================
// Profile Image Modal (optional)
// =============================
const profileImg = document.querySelector(".profile01-img");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeImageModal = document.getElementById("closeImageModal");

if (profileImg && imageModal && modalImage) {
  profileImg.addEventListener("click", () => {
    modalImage.src = profileImg.src;
    imageModal.style.display = "block";
  });
  closeImageModal?.addEventListener("click", () => {
    imageModal.style.display = "none";
  });
}

// =============================
// CV Modal Button
// =============================
const openCvBtn = document.createElement("button");
openCvBtn.textContent = "📄 View My CV";
openCvBtn.className = "filter-btn";

document.querySelector("#contact .container")?.appendChild(openCvBtn);

const cvModal = document.getElementById("cvModal");
const cvFrame = document.getElementById("cvFrame");
const closeCvModal = document.getElementById("closeCvModal");

if (cvModal && cvFrame) {
  openCvBtn.addEventListener("click", () => {
    cvFrame.src = "Thabang_CV.pdf";
    cvModal.style.display = "block";
  });

  closeCvModal?.addEventListener("click", () => {
    cvModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === cvModal) {
      cvModal.style.display = "none";
    }
  });
}

// =============================
// Dark Mode Toggle
// =============================

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("darkModeToggle");
  if (!toggleBtn) return;

  // Check stored theme in localStorage
  const isDark = localStorage.getItem("theme") === "dark";

  // Apply theme to body on load
  document.body.classList.toggle("dark", isDark);

  // Update button text and aria-pressed attribute
  toggleBtn.textContent = isDark ? "🌞 Light Mode" : "🌓 Toggle Dark Mode";
  toggleBtn.setAttribute("aria-pressed", isDark.toString());

  // Add click listener to toggle theme
  toggleBtn.addEventListener("click", () => {
    const dark = document.body.classList.toggle("dark");
    toggleBtn.textContent = dark ? "🌞 Light Mode" : "🌓 Toggle Dark Mode";
    toggleBtn.setAttribute("aria-pressed", dark.toString());
    localStorage.setItem("theme", dark ? "dark" : "light");
  });
});

// =============================
// Intro Typing Effect
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const introText = "Hi, I'm Thabang Paul, This is My Portfolio";
  const intro = document.getElementById("intro");
  let index = 0;

  function typeIntro() {
    if (!intro) return;
    if (index < introText.length) {
      intro.innerHTML += introText.charAt(index++);
      setTimeout(typeIntro, 100);
    }
  }

  typeIntro();
});

// =============================
// Responsive Navigation Toggle
// =============================
const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");

menuToggle?.addEventListener("click", () => {
  sideMenu?.classList.toggle("show");
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    sideMenu?.classList.remove("show");
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (cvModal) cvModal.style.display = "none";
    if (imageModal) imageModal.style.display = "none";
  }
});
// Fetch projects and render dynamically
async function loadProjects() {
  const response = await fetch("/api/projects");
  const projects = await response.json();

  const projectList = document.getElementById("project-list");
  projectList.innerHTML = ""; // clear existing

  projects.forEach((project) => {
    const div = document.createElement("div");
    div.className = "project";
    div.dataset.category = project.category;
    div.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.description}</p>
    `;
    projectList.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", loadProjects);
