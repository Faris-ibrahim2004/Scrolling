const gallery = document.querySelector(".gallery");
const galleryTrack = document.querySelector(".gallery-track");
const progressBar = document.querySelector(".gallery-progress-bar");

let scrollDistance = 0;
let ticking = false;

let currentX = 0;
let targetX = 0;

const ease = 0.08;

// Calculate gallery dimensions
function calculateGallery() {
  scrollDistance = Math.max(0, galleryTrack.scrollWidth - window.innerWidth);

  // Give the gallery enough vertical space
  gallery.style.height = `${window.innerHeight + scrollDistance}px`;

  updateGallery();
}

function updateGallery() {
  const galleryTop = gallery.getBoundingClientRect().top + window.scrollY;

  const progress =
    scrollDistance > 0
      ? Math.min(Math.max((window.scrollY - galleryTop) / scrollDistance, 0), 1)
      : 0;

  targetX = progress * scrollDistance;

  progressBar.style.transform = `scaleX(${progress})`;
}

function animateGallery() {
  currentX += (targetX - currentX) * ease;

  galleryTrack.style.transform = `translate3d(${-currentX}px, 0, 0)`;

  requestAnimationFrame(animateGallery);
}

animateGallery();
// Handle scroll efficiently
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateGallery();
      ticking = false;
    });

    ticking = true;
  }
});

// Recalculate on resize
window.addEventListener("resize", calculateGallery);

// Initial calculation
window.addEventListener("load", calculateGallery);
