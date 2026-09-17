/* Confeti casero: sin librerías, para que la página cargue rápido
   incluso con mala señal. */
window.Confeti = (function () {
  const lienzo = document.getElementById("confeti");
  const ctx = lienzo.getContext("2d");
  const colores = ["#FF7E8B", "#A88BEB", "#5EB8F0", "#FFA45C", "#4FC9AE", "#FFD166"];
  const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let trozos = [];
  let corriendo = false;

  function medir() {
    const d = window.devicePixelRatio || 1;
    lienzo.width = innerWidth * d;
    lienzo.height = innerHeight * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
  }
  medir();
  addEventListener("resize", medir);

  function animar() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    trozos = trozos.filter((t) => t.y < innerHeight + 40);

    for (const t of trozos) {
      t.vy += 0.16;                 // gravedad
      t.x += t.vx;
      t.y += t.vy;
      t.giro += t.vgiro;
      t.vida -= 0.006;

      ctx.save();
      ctx.translate(t.x, t.y);
      ctx.rotate(t.giro);
      ctx.globalAlpha = Math.max(0, t.vida);
      ctx.fillStyle = t.color;
      ctx.fillRect(-t.ancho / 2, -t.alto / 2, t.ancho, t.alto);
      ctx.restore();
    }

    if (trozos.length) requestAnimationFrame(animar);
    else { corriendo = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  }

  function lanzar(cantidad = 60, desde = 0.5) {
    if (quieto) return;
    const x0 = innerWidth * desde;
    const y0 = innerHeight * 0.42;
    for (let i = 0; i < cantidad; i++) {
      const ang = Math.random() * Math.PI * 2;
      const fuerza = 4 + Math.random() * 7;
      trozos.push({
        x: x0 + (Math.random() - 0.5) * 60,
        y: y0,
        vx: Math.cos(ang) * fuerza,
        vy: Math.sin(ang) * fuerza - 4,
        ancho: 6 + Math.random() * 6,
        alto: 9 + Math.random() * 8,
        giro: Math.random() * Math.PI,
        vgiro: (Math.random() - 0.5) * 0.3,
        color: colores[(Math.random() * colores.length) | 0],
        vida: 1
      });
    }
    if (!corriendo) { corriendo = true; requestAnimationFrame(animar); }
  }

  return { lanzar };
})();
