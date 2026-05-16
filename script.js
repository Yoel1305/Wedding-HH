const WEDDING_DATE = new Date("2025-10-04T10:00:00Z");
const PHOTO_COUNT = 63;

function updateTimer() {
  const now = new Date();
  const displayDate = now < WEDDING_DATE ? WEDDING_DATE : now;
  const diff = Math.max(0, displayDate.getTime() - WEDDING_DATE.getTime());

  let years = displayDate.getUTCFullYear() - WEDDING_DATE.getUTCFullYear();
  let months = displayDate.getUTCMonth() - WEDDING_DATE.getUTCMonth();
  let days = displayDate.getUTCDate() - WEDDING_DATE.getUTCDate();

  if (days < 0) {
    const previousMonth = new Date(Date.UTC(displayDate.getUTCFullYear(), displayDate.getUTCMonth(), 0));
    days += previousMonth.getUTCDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const totalDays = Math.floor(totalSeconds / 86400);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = totalSeconds % 60;

  const values = { years, months, days, hours, minutes, seconds };

  Object.entries(values).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = String(value).padStart(id === "years" || id === "months" || id === "days" ? 1 : 2, "0");
    }
  });

  const totalDaysElement = document.getElementById("totalDays");
  if (totalDaysElement) {
    totalDaysElement.textContent = `Soit ${totalDays.toLocaleString("fr-FR")} jours d'amour.`;
  }
}

function createHeart() {
  const container = document.getElementById("hearts-container");
  if (!container) return;

  const heart = document.createElement("span");
  const duration = 7 + Math.random() * 5;
  const drift = (Math.random() - 0.5) * 160;

  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "♡" : "♥";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${16 + Math.random() * 24}px`;
  heart.style.color = Math.random() > 0.5 ? "#d7b56d" : "#62d2c8";
  heart.animate(
    [
      { transform: "translate3d(0, 0, 0) scale(0.8)", opacity: 0 },
      { transform: `translate3d(${drift * 0.45}px, -48vh, 0) scale(1)`, opacity: 0.72 },
      { transform: `translate3d(${drift}px, -104vh, 0) scale(1.2)`, opacity: 0 }
    ],
    { duration: duration * 1000, easing: "cubic-bezier(.22,.61,.36,1)" }
  );

  container.appendChild(heart);
  window.setTimeout(() => heart.remove(), duration * 1000);
}

function initHome() {
  updateTimer();
  window.setInterval(updateTimer, 1000);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(createHeart, 700);
  }
}

function initGallery() {
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("closeBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const photoCount = document.getElementById("photoCount");

  if (!gallery || !lightbox || !lightboxImg || !closeBtn || !prevBtn || !nextBtn || !photoCount) {
    return;
  }

  let activeIndex = 0;
  const photos = Array.from({ length: PHOTO_COUNT }, (_, index) => ({
    src: `photo${index + 1}.jpeg`,
    alt: `Souvenir du mariage ${index + 1}`
  }));

  const fragment = document.createDocumentFragment();
  photos.forEach((photo, index) => {
    const button = document.createElement("button");
    const image = document.createElement("img");

    button.className = "photo-card";
    button.type = "button";
    button.style.animationDelay = `${Math.min(index * 18, 520)}ms`;
    button.setAttribute("aria-label", `Ouvrir la photo ${index + 1}`);

    image.src = photo.src;
    image.alt = photo.alt;
    image.loading = index < 8 ? "eager" : "lazy";
    image.decoding = "async";

    button.appendChild(image);
    button.addEventListener("click", () => openLightbox(index));
    fragment.appendChild(button);
  });

  gallery.appendChild(fragment);

  function renderLightbox() {
    const photo = photos[activeIndex];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt;
    photoCount.textContent = `${activeIndex + 1} / ${photos.length}`;
  }

  function openLightbox(index) {
    activeIndex = index;
    renderLightbox();
    if (typeof lightbox.showModal === "function") {
      lightbox.showModal();
    } else {
      lightbox.setAttribute("open", "");
    }
  }

  function closeLightbox() {
    if (typeof lightbox.close === "function") {
      lightbox.close();
    } else {
      lightbox.removeAttribute("open");
    }
  }

  function move(step) {
    activeIndex = (activeIndex + step + photos.length) % photos.length;
    renderLightbox();
  }

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => move(-1));
  nextBtn.addEventListener("click", () => move(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.open) return;
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });
}

if (document.body.classList.contains("home-page")) {
  initHome();
}

if (document.body.classList.contains("gallery-page")) {
  initGallery();
}
