// Mobile menu
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

burger?.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
});

mobileMenu?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// GSAP motion
gsap.registerPlugin(ScrollTrigger);

// Intro reveal
gsap.to(".reveal", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.08,
  delay: 0.1,
});

// Section reveal on scroll
gsap.utils.toArray(".section .reveal").forEach((el) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
    }
  );
});

// Animate skill bars
ScrollTrigger.create({
  trigger: "#skills",
  start: "top 75%",
  onEnter: () => {
    gsap.to(".bar span", {
      scaleX: 1,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.08,
    });
  },
});

// Count-up numbers
function animateCount(el, endValue) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: endValue,
    duration: 1.2,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = Math.round(obj.val).toString();
    },
  });
}

ScrollTrigger.create({
  trigger: ".stats",
  start: "top 80%",
  once: true,
  onEnter: () => {
    document.querySelectorAll(".num[data-count]").forEach((el) => {
      const endValue = parseInt(el.getAttribute("data-count") || "0", 10);
      animateCount(el, endValue);
    });
  },
});

// Subtle parallax on blobs
gsap.to(".b1", { y: -40, scrollTrigger: { scrub: true } });
gsap.to(".b2", { y: -60, scrollTrigger: { scrub: true } });
gsap.to(".b3", { y: -30, scrollTrigger: { scrub: true } });

// 3D tilt card
const tiltCard = document.getElementById("tiltCard");
if (tiltCard) {
  const inner = tiltCard.querySelector(".card3d-inner");
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  tiltCard.addEventListener("mousemove", (e) => {
    const r = tiltCard.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    const rotY = clamp((px - 0.5) * 16, -10, 10);
    const rotX = clamp((0.5 - py) * 16, -10, 10);

    inner.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    inner.style.setProperty("--mx", `${px * 100}%`);
    inner.style.setProperty("--my", `${py * 100}%`);
  });

  tiltCard.addEventListener("mouseleave", () => {
    inner.style.transform = `rotateX(0deg) rotateY(0deg)`;
    inner.style.setProperty("--mx", `50%`);
    inner.style.setProperty("--my", `50%`);
  });
}
