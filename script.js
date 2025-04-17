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
    if (scrollTop > lastScrollTop && scrollTop > 300) {
      navbar.style.top = "-100px";
    } else {
      navbar.style.top = "0";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
  });

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
