// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Select elements
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.getElementById("navbar");
  const navItems = document.querySelectorAll(".nav-links a");

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      // Toggle hamburger animation
      const spans = this.querySelectorAll("span");
      if (navLinks.classList.contains("active")) {
        spans[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }

  // Close mobile menu when clicking on a link
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active");

        // Reset hamburger
        const spans = navToggle.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  });

  // Navbar scroll effect
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add box shadow when scrolling down
    if (scrollTop > 10) {
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
      navbar.style.padding = "0.7rem 0";
    } else {
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      navbar.style.padding = "1rem 0";
    }

    // Hide navbar when scrolling down, show when scrolling up
    // if (scrollTop > lastScrollTop && scrollTop > 300) {
    //   navbar.style.top = "-100px";
    // } else {
    //   navbar.style.top = "0";
    // }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
  });

  function validateForm() {
    let isValid = true;
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");

    // Clear previous error messages
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";

    // Remove previous error highlighting
    nameInput.style.borderColor = "#e0e0e0";
    emailInput.style.borderColor = "#e0e0e0";
    phoneInput.style.borderColor = "#e0e0e0";

    // Validate name (minimum 3 characters)
    if (nameInput.value.trim() === "" || nameInput.value.length < 3) {
      document.getElementById("nameError").textContent =
        "Please enter a valid name (at least 3 characters)";
      nameInput.style.borderColor = "#e74c3c";
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address";
      emailInput.style.borderColor = "#e74c3c";
      isValid = false;
    }

    // Validate phone (Indian format, allowing multiple formats)
    const phonePattern = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    if (!phonePattern.test(phoneInput.value)) {
      document.getElementById("phoneError").textContent =
        "Please enter a valid Indian phone number";
      phoneInput.style.borderColor = "#e74c3c";
      isValid = false;
    }

    if (isValid) {
      // Show success message
      const submitBtn = document.querySelector(".submit-btn");
      const originalContent = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.backgroundColor = "#27ae60";

      setTimeout(() => {
        // Reset the form
        document.getElementById("contactForm").reset();

        // Reset the button
        submitBtn.innerHTML = originalContent;
        submitBtn.style.backgroundColor = "#3498db";
      }, 2000);

      // Here you would typically submit the form data to your backend
      // Using AJAX or fetch API
    }

    return false; // Always return false to prevent actual form submission
  }

  // Animate on scroll
  const animateOnScroll = function () {
    const animatedElements = document.querySelectorAll(
      ".feature-card, .country-card, .step, .contact-item"
    );

    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("fade-in");
      }
    });
  };

  // Add fade-in class for animation
  const style = document.createElement("style");
  style.innerHTML = `
        .fade-in {
            animation: fadeIn 0.6s ease forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .feature-card, .country-card, .step, .contact-item {
            opacity: 0;
        }
    `;
  document.head.appendChild(style);

  // Call animation function on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Call once on page load to animate visible elements
  setTimeout(animateOnScroll, 300);
});
