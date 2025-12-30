// Smooth, lightweight interactivity. No frameworks.

const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const topbar = document.querySelector(".topbar");
menuBtn?.addEventListener("click", () => {
  const isOpen = topbar.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Close menu when clicking a nav link (mobile)
document.querySelectorAll(".nav a").forEach(a => {
  a.addEventListener("click", () => {
    if (topbar.classList.contains("open")) {
      topbar.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
});

// Scroll reveal
const revealEls = Array.from(document.querySelectorAll(".reveal"));
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) e.target.classList.add("in");
  }
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Spotlight cursor glow
const spotlight = document.querySelector(".spotlight");
window.addEventListener("pointermove", (e) => {
  if (!spotlight) return;
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  spotlight.style.setProperty("--x", `${x}%`);
  spotlight.style.setProperty("--y", `${y}%`);
});

// Subtle 3D tilt on hover
function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

document.querySelectorAll("[data-tilt]").forEach(card => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;   // 0..1
    const py = (e.clientY - r.top) / r.height;   // 0..1
    const rx = clamp((0.5 - py) * 10, -8, 8);
    const ry = clamp((px - 0.5) * 12, -10, 10);
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

// Copy email button
const toast = document.getElementById("toast");
const copyBtn = document.getElementById("copyEmail");

function showToast(msg){
  if (!toast) return;
  toast.textContent = msg;
  toast.style.opacity = "1";
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.textContent = "";
  }, 1800);
}

copyBtn?.addEventListener("click", async () => {
  const email = copyBtn.getAttribute("data-email") || "";
  try {
    await navigator.clipboard.writeText(email);
    showToast("Email copied.");
  } catch {
    showToast("Could not copy (browser blocked).");
  }
});
