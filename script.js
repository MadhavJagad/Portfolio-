// DOM Elements
const loader = document.querySelector(".loader");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("section");
const header = document.querySelector("header");
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.getElementById("contactForm");
const animatedElements = document.querySelectorAll(
  ".reveal-left, .reveal-right, .reveal-bottom"
);

// Page Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.style.overflow = "visible";
    // Start animation for hero elements
    document.querySelectorAll(".animate-text").forEach((element) => {
      element.style.opacity = "1";
    });
  }, 1500);
});

// Mobile Menu Toggle
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");

  // Change icon when menu is open
  if (menuToggle.classList.contains("active")) {
    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    menuToggle.innerHTML = '<i class="fa fa-bars"></i>';
  }
});

// Close menu when clicking on a nav link (mobile)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.innerHTML = '<i class="fa fa-bars"></i>';
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

// Active link on scroll
function highlightNavOnScroll() {
  const scrollPosition = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Scroll animations (header and reveal animations)
function handleScrollAnimations() {
  // Header shrink on scroll
  const scrollPosition = window.scrollY;
  if (scrollPosition > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Reveal animations
  animatedElements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

// Project Filters
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons and add to current
    filterBtns.forEach((filterBtn) => filterBtn.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    // Filter projects
    projectCards.forEach((card) => {
      if (
        filterValue === "all" ||
        card.getAttribute("data-category") === filterValue
      ) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 100);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// Form Submission
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Create formData object
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  // Show sending state
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate sending (in a real application, I have to use a service like EmailJS, FormSpree, etc. as I am noy doing it right now simply showing the data in console log)
  setTimeout(() => {
    // Here I would normally send the form data to your email service
    console.log("Form data:", formData);

    // Show success message
    const successMessage = document.createElement("div");
    successMessage.className = "form-success-message";
    successMessage.textContent =
      "Thank you! Your message has been sent successfully.";
    successMessage.style.color = "#10b981";
    successMessage.style.padding = "1rem 0";
    contactForm.appendChild(successMessage);

    // Reset form
    contactForm.reset();

    // Reset button
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;

    // Remove success message after 5 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }, 1500);
});

// Email validation function (used for form validation)
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Add form validation
const emailInput = document.getElementById("email");
emailInput.addEventListener("blur", function () {
  if (this.value && !isValidEmail(this.value)) {
    this.style.borderColor = "#ef4444";

    // Add error message if not already present
    if (
      !this.nextElementSibling ||
      !this.nextElementSibling.classList.contains("form-error")
    ) {
      const errorMessage = document.createElement("div");
      errorMessage.className = "form-error";
      errorMessage.textContent = "Please enter a valid email address";
      errorMessage.style.color = "#ef4444";
      errorMessage.style.fontSize = "0.85rem";
      errorMessage.style.marginTop = "0.25rem";
      this.parentNode.appendChild(errorMessage);
    }
  } else {
    this.style.borderColor = "";

    // Remove error message if exists
    if (
      this.nextElementSibling &&
      this.nextElementSibling.classList.contains("form-error")
    ) {
      this.nextElementSibling.remove();
    }
  }
});

// Initialize event listeners
window.addEventListener("scroll", () => {
  highlightNavOnScroll();
  handleScrollAnimations();
});

// Call once on page load
highlightNavOnScroll();
handleScrollAnimations();

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
  // Prevent animations from running before page is fully loaded
  setTimeout(() => {
    handleScrollAnimations();
  }, 1500);
});
