// Cambia aquí el mensaje que aparece al final
// Cambia aquí el mensaje que aparece al final
const CONFIG = {
    mensaje: "Para ti, TE AMO 🩵...",
    luciernagas: 16,
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    const svg = document.getElementById("jardin-svg");
  
    JardinUtils.tulipan(svg, { x: 55, y: 430, escala: 0.75, retraso: 1.4, giro: -4 });
    JardinUtils.tulipan(svg, { x: 345, y: 452, escala: 0.68, retraso: 1.7, giro: 5 });
    JardinUtils.girasol(svg);
    JardinUtils.luciernagas(document.body, CONFIG.luciernagas);
  
    document.querySelector(".jardin__mensaje").textContent = CONFIG.mensaje;
  });