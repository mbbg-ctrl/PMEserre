const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Position du joueur
let x = 50;
let y = 500;
let speedY = 0;

// Gravité
const gravity = 0.5;

// Vitesse du défilement
let scrollSpeed = 4;

// Touche
let keys = {};

document.addEventListener("keydown", e => {
  keys[e.code] = true;
});

document.addEventListener("keyup", e => {
  keys[e.code] = false;
});

// Obstacles (x, y, largeur, hauteur)
let obstacles = [
  { x: 300, y: 460, width: 80, height: 40 },
  { x: 600, y: 460, width: 100, height: 40 },
  { x: 900, y: 460, width: 60, height: 40 }
];

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // On ne bouge plus le joueur horizontalement (Geometry Dash = avance auto)
  // Le joueur ne peut que sauter
  if (keys["Space"] && speedY === 0) speedY = -13;

  // Appliquer la gravité
  speedY += gravity;
  y += speedY;

  // Collision sol
  if (y > 500) {
    y = 500;
    speedY = 0;
  }

  // Déplacement des obstacles vers la gauche
  for (let obs of obstacles) {
    obs.x -= scrollSpeed;

    // Si un obstacle sort de l'écran → on le remet plus loin
    if (obs.x + obs.width < 0) {
      obs.x = canvas.width + Math.random() * 300; // distance aléatoire
    }

    // Affichage obstacle
    ctx.fillStyle = "brown";
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

    // Collision joueur / obstacle (atterrissage)
    if (
      x < obs.x + obs.width &&
      x + 40 > obs.x &&
      y + 40 > obs.y &&
      y < obs.y + obs.height
    ) {
      y = obs.y - 40;
      speedY = 0;
    }
  }

  // Dessiner le joueur
  ctx.fillStyle = "red";
  ctx.fillRect(x, y, 40, 40);

  requestAnimationFrame(gameLoop);
}

gameLoop();
