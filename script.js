// === COEURS FLOTTANTS ANIMÉS ===
const heartsContainer = document.getElementById("hearts-container");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💙";

  // Position et taille aléatoires
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 15 + Math.random() * 25 + "px";

  // Animation variée
  const duration = 6 + Math.random() * 4;
  heart.style.animationDuration = duration + "s";

  // Direction aléatoire : haut, diagonales, etc.
  const direction = Math.random();
  let rotation = "0deg";
  let translateX = "0";

  if (direction < 0.33)
    translateX = "-30vw"; // gauche
  else if (direction < 0.66)
    translateX = "30vw"; // droite
  else translateX = "0"; // tout droit

  // Génération des keyframes personnalisées
  const heartAnimation = document.createElement("style");
  const animName = `floatHeart${Date.now()}${Math.floor(Math.random() * 1000)}`;
  heartAnimation.innerHTML = `
    @keyframes ${animName} {
      0% {
        transform: translate(0, 100vh) rotate(0deg) scale(0.8);
        opacity: 0.6;
      }
      50% {
        opacity: 1;
        transform: translate(${translateX}, 50vh) rotate(${rotation}) scale(1.1);
      }
      100% {
        transform: translate(calc(${translateX} / 2), -10vh) rotate(20deg) scale(1.2);
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

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(days / 365.25);

  document.getElementById("years").innerText = years;
  document.getElementById("months").innerText = months;
  document.getElementById("days").innerText = days % 30;
  document.getElementById("hours").innerText = hours % 24;
  document.getElementById("minutes").innerText = minutes % 60;
  document.getElementById("seconds").innerText = seconds % 60;

  document.getElementById("totalDays").innerText =
    `Soit ${days} jours d’amour 💙`;
}

setInterval(updateTimer, 1000);
