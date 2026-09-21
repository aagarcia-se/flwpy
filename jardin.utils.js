// Utilidades para dibujar el jardín (sin módulos, para que funcione abriendo el index.html directo)
const JardinUtils = (() => {
    const NS = "http://www.w3.org/2000/svg";
    const ANGULO_DORADO = Math.PI * (3 - Math.sqrt(5)); // ≈ 137.5°, el mismo patrón de un girasol real
    const rand = (min, max) => min + Math.random() * (max - min);
  
    const crear = (tag, attrs = {}, padre) => {
      const el = document.createElementNS(NS, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      if (padre) padre.appendChild(el);
      return el;
    };
  
    // Pétalo en forma de gota, con la base en (0,0) apuntando hacia arriba
    const trazoPetalo = (L, W) =>
      `M0,0 C${-W},${-L * 0.3} ${-W * 0.85},${-L * 0.88} 0,${-L} C${W * 0.85},${-L * 0.88} ${W},${-L * 0.3} 0,0Z`;
  
    const capaPetalos = (padre, { cantidad, largo, ancho, desfase, relleno, retraso }) => {
      for (let i = 0; i < cantidad; i++) {
        const giro = desfase + (360 / cantidad) * i + rand(-3, 3);
        const rotado = crear("g", { transform: `rotate(${giro})` }, padre);
        const L = largo * rand(0.92, 1.08);
        const petalo = crear("g", { class: "petalo", style: `--d:${(retraso + i * 0.05).toFixed(2)}s` }, rotado);
        crear("path", { d: trazoPetalo(L, ancho), fill: relleno }, petalo);
        crear("path", { d: `M0,-6 Q${rand(-3, 3)},${-L * 0.5} 0,${-L * 0.88}`, class: "nervio" }, petalo);
      }
    };
  
    // Semillas en espiral (filotaxis): el centro del girasol
    const semillas = (padre, total, radio) => {
      crear("circle", { r: radio + 3, fill: "#2a1608" }, padre);
      const g = crear("g", { class: "semillas" }, padre);
      const c = radio / Math.sqrt(total);
      for (let i = 0; i < total; i++) {
        const r = c * Math.sqrt(i);
        const a = i * ANGULO_DORADO;
        const t = i / total;
        crear("circle", {
          cx: (r * Math.cos(a)).toFixed(2),
          cy: (r * Math.sin(a)).toFixed(2),
          r: (1.5 + t * 1.6).toFixed(2),
          fill: `hsl(${30 + t * 14} ${50 - t * 12}% ${11 + t * 24 + rand(0, 6)}%)`,
        }, g);
      }
      crear("circle", { r: radio, fill: "url(#gSombraCentro)" }, g);
    };
  
    const girasol = (svg) => {
      const g = crear("g", { class: "mecer" }, svg);
      crear("path", { d: "M200,625 C193,520 210,400 200,215", class: "tallo", pathLength: 1, style: "--dt:.2s" }, g);
  
      [[480, 1], [405, -1]].forEach(([y, lado], i) => {
        const pos = crear("g", { transform: `translate(200,${y}) scale(${lado},1)` }, g);
        const hoja = crear("g", { class: "hoja", style: `--d:${1 + i * 0.35}s` }, pos);
        crear("path", { d: "M0,0 C-10,-42 -72,-74 -116,-42 C-104,2 -50,28 0,0Z", fill: "url(#gHoja)" }, hoja);
        crear("path", { d: "M-4,-2 Q-52,-24 -102,-38", class: "nervio-hoja" }, hoja);
      });
  
      const posicion = crear("g", { transform: "translate(200,205) rotate(-5)" }, g);
      const flor = crear("g", { class: "cabeza" }, posicion);
      capaPetalos(flor, { cantidad: 21, largo: 128, ancho: 24, desfase: 0, relleno: "url(#gPetaloAtras)", retraso: 1.7 });
      capaPetalos(flor, { cantidad: 21, largo: 116, ancho: 22, desfase: 360 / 42, relleno: "url(#gPetaloFrente)", retraso: 2.2 });
      semillas(flor, 520, 60);
    };
  
    const tulipan = (svg, { x, y, escala, retraso, giro }) => {
      const g = crear("g", { transform: `translate(${x},${y}) scale(${escala})` }, svg);
      crear("path", { d: "M0,250 C10,170 -8,90 0,0", class: "tallo", pathLength: 1, style: `--dt:${retraso}s;stroke-width:6` }, g);
  
      const hoja = crear("g", { class: "hoja", style: `--d:${retraso + 0.9}s;transform-origin:100% 100%` }, g);
      crear("path", { d: "M0,235 C-46,205 -62,140 -50,70 C-22,110 -6,170 0,235Z", fill: "url(#gHoja)" }, hoja);
  
      const inclinado = crear("g", { transform: `rotate(${giro})` }, g);
      const cabeza = crear("g", { class: "cabeza-tulipan", style: `--d:${retraso + 0.7}s` }, inclinado);
      crear("path", { d: "M0,4 C-40,-6 -44,-62 -22,-92 C-10,-70 -2,-38 0,4Z", fill: "url(#gTulipanLado)" }, cabeza);
      crear("path", { d: "M0,4 C40,-6 44,-62 22,-92 C10,-70 2,-38 0,4Z", fill: "url(#gTulipanLado)" }, cabeza);
      crear("path", { d: "M0,6 C-30,-6 -32,-64 0,-98 C32,-64 30,-6 0,6Z", fill: "url(#gTulipan)" }, cabeza);
      crear("path", { d: "M0,-4 Q-3,-50 0,-88", class: "nervio" }, cabeza);
    };
  
    const luciernagas = (contenedor, cantidad) => {
      for (let i = 0; i < cantidad; i++) {
        const el = document.createElement("span");
        el.className = "luciernaga";
        el.style.cssText = [
          `--x:${rand(3, 97).toFixed(1)}%`, `--y:${rand(8, 92).toFixed(1)}%`,
          `--t:${rand(2, 4.5).toFixed(1)}px`,
          `--dx:${rand(-40, 40).toFixed(0)}px`, `--dy:${rand(-60, 20).toFixed(0)}px`,
          `--dur:${rand(6, 12).toFixed(1)}s`, `--ret:${rand(3, 9).toFixed(1)}s`,
        ].join(";");
        contenedor.appendChild(el);
      }
    };
  
    return { girasol, tulipan, luciernagas };
  })();