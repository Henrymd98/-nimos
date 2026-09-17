/* ============================================================
   Ruleta de planes. Ocho gajos, uno por plan.
   ============================================================ */
(function () {
  "use strict";
  const { $, Sonido, vibrar, alEntrar, color, quieto } = window.T;

  const lienzo = $("#ruleta");
  const ctx = lienzo.getContext("2d");
  const LADO = 300;
  const TONOS = ["coral", "lavanda", "cielo", "menta", "durazno", "miel", "coral", "lavanda"];

  let anguloActual = 0;
  let girando = false;
  let planElegido = null;

  function dibujar() {
    const planes = window.MENSAJES.planes;
    const d = window.devicePixelRatio || 1;
    lienzo.width = LADO * d;
    lienzo.height = LADO * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);

    const R = LADO / 2;
    const paso = (Math.PI * 2) / planes.length;

    ctx.clearRect(0, 0, LADO, LADO);
    ctx.translate(R, R);

    planes.forEach((plan, i) => {
      // el 0 del canvas está a las 3; giramos para que el gajo 0 empiece arriba
      const desde = i * paso - Math.PI / 2;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, R - 4, desde, desde + paso);
      ctx.closePath();
      ctx.fillStyle = color(TONOS[i % TONOS.length]);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.55)";
      ctx.lineWidth = 2;
      ctx.stroke();

      const bisectriz = desde + paso / 2;
      ctx.save();
      ctx.rotate(bisectriz);
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.font = "700 15px Quicksand, system-ui, sans-serif";
      if (Math.cos(bisectriz) < 0) {
        // en la mitad izquierda el texto saldría de cabeza: se voltea
        ctx.rotate(Math.PI);
        ctx.textAlign = "left";
        ctx.fillText(plan.corto, -(R - 20), 0);
      } else {
        ctx.textAlign = "right";
        ctx.fillText(plan.corto, R - 20, 0);
      }
      ctx.restore();
    });

    // centro
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, Math.PI * 2);
    ctx.fillStyle = "#FFF7F2";
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,.08)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.font = "20px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🎲", 0, 1);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function girar() {
    if (girando) return;
    const planes = window.MENSAJES.planes;
    girando = true;
    planElegido = null;
    $("#resultado-plan").hidden = true;
    Sonido.tocar("giro");
    vibrar(12);

    const i = (Math.random() * planes.length) | 0;
    const porGajo = 360 / planes.length;
    const centro = i * porGajo + porGajo / 2;          // dónde está ese gajo
    const destino = (360 - centro) % 360;              // hay que dejarlo mirando arriba
    const actual = ((anguloActual % 360) + 360) % 360;
    let delta = destino - actual;
    if (delta < 0) delta += 360;

    const tranquilo = quieto();
    anguloActual += (tranquilo ? 0 : 360 * 5) + delta;

    lienzo.style.transition = tranquilo ? "none" : "transform 4.2s cubic-bezier(.16,.84,.3,1)";
    lienzo.style.transform = `rotate(${anguloActual}deg)`;

    setTimeout(() => {
      girando = false;
      planElegido = planes[i];
      $("#plan-texto").textContent = planElegido.texto;
      $("#resultado-plan").hidden = false;
      $("#resultado-plan").scrollIntoView({ behavior: "smooth", block: "end" });
      Sonido.tocar("abrir");
      vibrar(20);
      window.Confeti.lanzar(45, 0.5);
    }, tranquilo ? 60 : 4300);
  }

  function mandar() {
    if (!planElegido) return;
    const texto = `${window.MENSAJES.invitacion} ${planElegido.texto}`;
    const numero = (window.CONFIG.whatsapp || "").replace(/\D/g, "");

    if (numero) {
      window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
      return;
    }
    // sin número configurado, lo copiamos para que lo pegue donde quiera
    const boton = $("#btn-mandar");
    const avisar = (ok) => {
      boton.textContent = ok ? "Copiado ✓" : texto;
      setTimeout(() => { boton.textContent = etiquetaBoton(); }, 2200);
    };
    try {
      navigator.clipboard.writeText(texto).then(() => avisar(true), () => avisar(false));
    } catch (e) { avisar(false); }
  }

  const etiquetaBoton = () =>
    (window.CONFIG.whatsapp || "").replace(/\D/g, "") ? "Mandárselo por WhatsApp" : "Copiar el plan";

  alEntrar("ruleta", () => {
    dibujar();
    $("#btn-mandar").textContent = etiquetaBoton();
  });

  $("#btn-girar").addEventListener("click", girar);
  $("#btn-girar-otra").addEventListener("click", girar);
  $("#btn-mandar").addEventListener("click", mandar);
})();
