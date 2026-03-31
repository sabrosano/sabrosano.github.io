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

  // 3. NUEVO: Observador para el efecto "Foco" (secciones) - Evita el overload
  const sections = document.querySelectorAll("main section, main .hero");
  
  const sectionFocusObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // La sección entra en foco: 100% visible y activa
          entry.target.style.opacity = "1";
          entry.target.style.transform = "scale(1)";
          entry.target.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
          entry.target.style.pointerEvents = "auto"; 
        } else {
          // La sección sale de foco: se difumina y se aleja levemente
          entry.target.style.opacity = "0.15"; 
          entry.target.style.transform = "scale(0.97)";
          entry.target.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
          entry.target.style.pointerEvents = "none"; 
        }
      });
    },
    {
      threshold: 0.40, // Se activa cuando casi la mitad de la sección está visible
    }
  );

  sections.forEach((section) => {
    // Estado inicial atenuado antes de empezar a hacer scroll
    section.style.opacity = "0.25";
    section.style.transform = "scale(0.97)";
    sectionFocusObserver.observe(section);
  });

} else {
  // Fallback si el navegador es muy antiguo
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}