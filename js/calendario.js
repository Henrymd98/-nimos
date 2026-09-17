/* ============================================================
   Siete días, siete mensajes. Se abre uno por día.
   ============================================================ */
window.Calendario = (function () {
  "use strict";
  const { $, almacen, hoyISO, diasEntre, Sonido, alEntrar } = window.T;

  const DIAS = () => window.MENSAJES.sieteDias;

  /* La fecha en que arranca la cuenta */
  function inicio() {
    const config = window.CONFIG.inicioCalendario;
    if (/^\d{4}-\d{2}-\d{2}$/.test(config || "")) return config;

    let guardado = almacen.leer("calendario-inicio", null);
    if (!guardado) { guardado = hoyISO(); almacen.escribir("calendario-inicio", guardado); }
    return guardado;
  }

  /* Cuántos se pueden abrir hoy (0 a 7) */
  function disponibles() {
    const pasados = diasEntre(inicio(), hoyISO()) + 1;
    return Math.max(0, Math.min(DIAS().length, pasados));
  }

  const leidos = () => almacen.leer("calendario-leidos", []);

  function hayNuevo() {
    const ya = leidos();
    for (let i = 0; i < disponibles(); i++) if (!ya.includes(i)) return true;
    return false;
  }

  function fechaDe(indice) {
    const d = new Date(inicio() + "T00:00:00");
    d.setDate(d.getDate() + indice);
    return d.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" });
  }

  function abrir(indice) {
    const dia = DIAS()[indice];
    const ya = leidos();
    if (!ya.includes(indice)) { ya.push(indice); almacen.escribir("calendario-leidos", ya); }
    Sonido.tocar("abrir");
    window.abrirCarta({
      emoji: ["🌱", "☁️", "🌤️", "🧸", "🌗", "🪴", "🌻"][indice] || "💌",
      titulo: dia.titulo,
      texto: dia.texto
    });
    pintar();
    window.Menu.refrescarAvisos();
  }

  function pintar() {
    const cont = $("#dias");
    const abiertos = disponibles();
    const ya = leidos();
    cont.innerHTML = "";

    DIAS().forEach((dia, i) => {
      const libre = i < abiertos;
      const visto = ya.includes(i);

      const b = document.createElement("button");
      b.className = "dia" + (libre ? "" : " cerrado") + (visto ? " visto" : "");
      b.disabled = !libre;
      b.innerHTML =
        `<span class="numero-dia" aria-hidden="true">${libre ? (visto ? "✓" : i + 1) : "🔒"}</span>
         <span class="texto-cat">
           <strong>${libre ? dia.titulo : "Día " + (i + 1)}</strong>
           <span>${libre ? (visto ? "ya lo leíste, puedes releerlo" : "sin abrir") : "se abre el " + fechaDe(i)}</span>
         </span>
         ${libre && !visto ? '<span class="aviso">nuevo</span>' : ""}`;
      if (libre) b.addEventListener("click", () => abrir(i));
      cont.appendChild(b);
    });

    const faltan = DIAS().length - abiertos;
    $("#calendario-explica").textContent = faltan > 0
      ? `Hay ${abiertos} ${abiertos === 1 ? "mensaje disponible" : "mensajes disponibles"}. El resto se va abriendo solo, uno por día.`
      : "Ya están los siete. Puedes releerlos cuando quieras.";
  }

  alEntrar("calendario", pintar);

  return { hayNuevo, pintar };
})();
