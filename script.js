// === COEURS FLOTTANTS ANIMÉS ===
const heartsContainer = document.getElementById("hearts-container");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💙";

  // position et taille aléatoires
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 15 + Math.random() * 25 + "px";

  // durée et direction aléatoires
  const duration = 6 + Math.random() * 4;
  heart.style.animationDuration = duration + "s";

  const direction = Math.random();
  let translateX = "0";
  if (direction < 0.33) translateX = "-25vw";
  else if (direction < 0.66) translateX = "25vw";

  // créer une animation unique par cœur
  const animName = `floatHeart${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const heartAnimation = document.createElement("style");
  heartAnimation.innerHTML = `
    @keyframes ${animName} {
      0% {
        transform: translate(0, 100vh) scale(0.8);
        opacity: 0.6;
      }
      50% {
        opacity: 1;
        transform: translate(${translateX}, 50vh) scale(1.1);
      }
      100% {
        transform: translate(calc(${translateX} / 2), -10vh) scale(1.3);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(heartAnimation);
  heart.style.animationName = animName;

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
    heartAnimation.remove();
  }, duration * 1000);
}

setInterval(createHeart, 500);

// === COMPTEUR D'AMOUR ===
const weddingDate = new Date("2025-10-04T10:00:00Z");

function updateTimer() {
  const now = new Date();
  let diff = now - weddingDate;
  if (diff < 0) diff = 0;

  // --- Calcul précis années / mois / jours ---
  let years = now.getFullYear() - weddingDate.getFullYear();
  let months = now.getMonth() - weddingDate.getMonth();
  let days = now.getDate() - weddingDate.getDate();

  if (days < 0) {
    // on “emprunte” les jours du mois précédent
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const daysInPrevMonth = prevMonth.getDate();
    days += daysInPrevMonth;
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  // --- Calcul total global ---
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diff / (1000 * 60));
  const totalSeconds = Math.floor(diff / 1000);

  const remainderHours = totalHours % 24;
  const remainderMinutes = totalMinutes % 60;
  const remainderSeconds = totalSeconds % 60;

  // --- Affichage ---
  document.getElementById("years").innerText = years;
  document.getElementById("months").innerText = months;
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = remainderHours;
  document.getElementById("minutes").innerText = remainderMinutes;
  document.getElementById("seconds").innerText = remainderSeconds;

  document.getElementById("totalDays").innerText =
    `Soit ${totalDays} jours d’amour 💙`;
}

setInterval(updateTimer, 1000);
