const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let animationId;
let isPaused = false;
let sunflowers = [];
let speed = 5;

document.getElementById("speed").addEventListener("input", (e) => {
  speed = e.target.value;
});

document.getElementById("drawBtn").addEventListener("click", () => {
  if (!animationId) {
    generateSunflowers();
    animate();
  } else if (isPaused) {
    isPaused = false;
    animate();
  }
});

document.getElementById("pauseBtn").addEventListener("click", () => {
  isPaused = true;
  cancelAnimationFrame(animationId);
  animationId = null;
});

document.getElementById("resetBtn").addEventListener("click", () => {
  isPaused = false;
  cancelAnimationFrame(animationId);
  animationId = null;
  sunflowers = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function generateSunflowers() {
  sunflowers = [];
  for (let i = 0; i < 3; i++) {
    sunflowers.push({
      x: canvas.width / 2 + (i - 1) * 120,
      y: canvas.height - 50,
      height: 0,
      maxHeight: 220 + Math.random() * 50
    });
  }
}

function drawSunflower(x, y, stemHeight) {
  // Tallo
  ctx.beginPath();
  ctx.strokeStyle = "#228B22";
  ctx.lineWidth = 6;
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - stemHeight);
  ctx.stroke();

  // Hojas
  ctx.beginPath();
  ctx.fillStyle = "#2e8b57";
  ctx.ellipse(x - 20, y - stemHeight / 2, 25, 45, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(x + 20, y - stemHeight / 2, 25, 45, -Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  if (stemHeight > 60) {
    let flowerY = y - stemHeight;
    let petalCount = 20;
    let radius = 50;

    // Pétalos amarillos
    for (let i = 0; i < petalCount; i++) {
      let angle = (i / petalCount) * Math.PI * 2;
      let petalX = x + Math.cos(angle) * radius;
      let petalY = flowerY + Math.sin(angle) * radius;

      ctx.beginPath();
      let gradient = ctx.createRadialGradient(petalX, petalY, 5, petalX, petalY, 25);
      gradient.addColorStop(0, "#fde68a");
      gradient.addColorStop(1, "#facc15");
      ctx.fillStyle = gradient;
      ctx.ellipse(petalX, petalY, 12, 30, angle, 0, Math.PI * 2);
      ctx.fill();
    }

    // Centro del girasol
    let grd = ctx.createRadialGradient(x, flowerY, 10, x, flowerY, 35);
    grd.addColorStop(0, "#5a3a1a");
    grd.addColorStop(1, "#2d1b0f");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, flowerY, 35, 0, Math.PI * 2);
    ctx.fill();

    // Simular semillas
    for (let i = 0; i < 100; i++) {
      let angle = Math.random() * Math.PI * 2;
      let r = Math.random() * 30;
      let sx = x + Math.cos(angle) * r;
      let sy = flowerY + Math.sin(angle) * r;
      ctx.fillStyle = "#1a1109";
      ctx.fillRect(sx, sy, 2, 2);
    }
  }
}

function animate() {
  if (isPaused) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sunflowers.forEach((sf) => {
    if (sf.height < sf.maxHeight) {
      sf.height += speed * 0.5;
    }
    drawSunflower(sf.x, sf.y, sf.height);
  });

  animationId = requestAnimationFrame(animate);
}
