document.documentElement.classList.add("js");

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const revealTargets = document.querySelectorAll(".reveal");

document.body.classList.add("is-ready");

// 1. Menú de navegación
if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.classList.toggle("is-open", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.classList.remove("is-open");
    });
  });
}

// 2. Animaciones iniciales (Reveal)
revealTargets.forEach((element) => {
  const delay = element.dataset.revealDelay;
  const duration = element.dataset.revealDuration;

  if (delay) {
    element.style.setProperty("--reveal-delay", `${delay}ms`);
  }

  if (duration) {
    element.style.setProperty("--reveal-duration", `${duration}ms`);
  }
});

if ("IntersectionObserver" in window) {
  // Observador para la animación de entrada (solo ocurre una vez)
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -12% 0px",
    }
  );

  revealTargets.forEach((element) => revealObserver.observe(element));

} else {
  // Fallback si el navegador es muy antiguo
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}


document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
  if (!track) return;

    const images = track.querySelectorAll('img');
    const dotsContainer = document.getElementById('carouselDots');
    let currentIndex = 0;

    // Create dots based on number of images
    images.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        goToSlide(currentIndex);
    }

    // Auto-play every 5 seconds
    let timer = setInterval(nextSlide, 2500);

    // Pause on hover
    const container = document.querySelector('.carousel-container');
    container.addEventListener('mouseenter', () => clearInterval(timer));
    container.addEventListener('mouseleave', () => timer = setInterval(nextSlide, 5000));
});