// -----------------------------
// Typing Animation (Hero Header)
// -----------------------------
const typedTextSpan = document.querySelector(".hero #typed-text");
const cursorSpan = document.querySelector(".hero .cursor");

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
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex = (textArrayIndex + 1) % textArray.length;
    setTimeout(type, typingDelay + 500);
  }
}

// Start typing on load
document.addEventListener("DOMContentLoaded", type);

// -----------------------------
// Scroll Reveal Animation
// -----------------------------
const observer = new IntersectionObserver(
  (entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observerInstance.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".section, .hero")
  .forEach((section) => observer.observe(section));

// -----------------------------
// Back to Top Button
// -----------------------------
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

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// -----------------------------
// Project Filter Logic (if used)
// -----------------------------
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll("#project-list .project");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projects.forEach((project) => {
      project.style.display =
        filter === "all" || project.getAttribute("data-category") === filter
          ? "block"
          : "none";
    });
  });
});

// -----------------------------
// Profile Image Modal
// -----------------------------
const profileImg = document.querySelector(".profile-img");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeImageModal = document.getElementById("closeImageModal");

if (profileImg) {
  profileImg.addEventListener("click", () => {
    modalImage.src = profileImg.src;
    imageModal.style.display = "block";
  });
}

if (closeImageModal) {
  closeImageModal.addEventListener("click", () => {
    imageModal.style.display = "none";
  });
}

// -----------------------------
// CV Modal
// -----------------------------
const openCvBtn = document.createElement("button");
openCvBtn.textContent = "📄 View My CV";
openCvBtn.className = "filter-btn";
document.querySelector("#contact .container")?.appendChild(openCvBtn);

const cvModal = document.getElementById("cvModal");
const cvFrame = document.getElementById("cvFrame");
const closeCvModal = document.getElementById("closeCvModal");

openCvBtn.addEventListener("click", () => {
  if (cvModal && cvFrame) {
    cvFrame.src = "Thabang_CV.pdf";
    cvModal.style.display = "block";
  }
});

if (closeCvModal) {
  closeCvModal.addEventListener("click", () => {
    cvModal.style.display = "none";
  });
}

window.addEventListener("click", (event) => {
  if (event.target === cvModal) {
    cvModal.style.display = "none";
  }
});

// -----------------------------
// Dark Mode Toggle
// -----------------------------
const toggleBtn = document.getElementById("darkModeToggle");

if (toggleBtn) {
  document.body.classList.toggle(
    "dark",
    localStorage.getItem("theme") === "dark"
  );
  toggleBtn.textContent = document.body.classList.contains("dark")
    ? "🌞 Light Mode"
    : "🌓 Toggle Dark Mode";

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    toggleBtn.textContent = isDark ? "🌞 Light Mode" : "🌓 Toggle Dark Mode";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// -----------------------------
// Hamburger Menu Toggle
// -----------------------------
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.querySelector("nav");

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    hamburgerBtn.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
  });
}

// -----------------------------
// Smooth Navigation and Section Display
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a");
  const allSections = document.querySelectorAll(".section, .hero");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);

      allSections.forEach((sec) => sec.classList.add("hidden"));
      target?.classList.remove("hidden");

      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
});
