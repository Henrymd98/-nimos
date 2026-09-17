/* ============================================================
   Navegación, portada y las dos ventanitas que se abren
   encima de todo (el corazón y las cartas).
   ============================================================ */
(function () {
  "use strict";
  const { $, $$, alAzar, otroDistinto, Sonido, mostrar, alEntrar } = window.T;

  /* ---------- lo que viene de config.js ---------- */
  function aplicarConfig() {
    $$("[data-nombre]").forEach((e) => { e.textContent = window.CONFIG.nombre; });
    $("#corona").textContent = window.CONFIG.emoji;
    document.title = "Para " + window.CONFIG.nombre;
    $("#duo-nombre1").value = window.CONFIG.nombre;
    if (!window.Voz.soportado) $$(".boton-voz").forEach((b) => { b.hidden = true; });
  }

  /* ---------- saludo que va rotando ---------- */
  let saludoPrevio = "";
  function nuevoSaludo() {
    const caja = $("#saludo");
    saludoPrevio = otroDistinto(window.MENSAJES.bienvenida, saludoPrevio);
    caja.style.opacity = 0;
    setTimeout(() => { caja.textContent = saludoPrevio; caja.style.opacity = 1; }, 180);
  }
  $("#saludo").style.transition = "opacity .35s ease";
  setInterval(() => {
    const enPortada = $("#pantalla-inicio").classList.contains("activa");
    const sinVentanas = $("#telon").hidden && $("#telon-carta").hidden;
    if (enPortada && sinVentanas) nuevoSaludo();
  }, 7000);

  /* ---------- avisos del menú ---------- */
  const Menu = {
    refrescarAvisos() {
      $("#aviso-calendario").hidden = !window.Calendario.hayNuevo();
    }
  };
  window.Menu = Menu;

  alEntrar("inicio", () => { nuevoSaludo(); Menu.refrescarAvisos(); });

  /* ---------- ventana de ánimo ---------- */
  let animoPrevio = "";

  function ponerAnimo() {
    animoPrevio = otroDistinto(window.MENSAJES.animo, animoPrevio);
    const p = $("#mensaje-animo");
    p.style.opacity = 0;
    setTimeout(() => { p.textContent = animoPrevio; p.style.opacity = 1; }, 140);
  }
  $("#mensaje-animo").style.transition = "opacity .3s ease";

  function abrirAnimo() {
    ponerAnimo();
    $("#telon").hidden = false;
    $("#btn-cerrar-animo").focus();
  }
  const cerrarAnimo = () => { $("#telon").hidden = true; };

  /* ---------- ventana de lectura (cartas y días) ---------- */
  let cartaActual = "";

  window.abrirCarta = function (carta) {
    cartaActual = carta.texto;
    $("#carta-emoji").textContent = carta.emoji || "💌";
    $("#carta-titulo").textContent = carta.titulo;
    $("#carta-texto").textContent = carta.texto;
    $("#carta-firma").textContent = "— " + window.CONFIG.firma;
    $("#telon-carta").hidden = false;
    $("#btn-cerrar-carta").focus();
  };
  const cerrarCarta = () => { $("#telon-carta").hidden = true; try { speechSynthesis.cancel(); } catch (e) {} };

  /* ---------- conexiones ---------- */
  $$("[data-abre]").forEach((b) => b.addEventListener("click", () => mostrar(b.dataset.abre)));
  $$("[data-ir]").forEach((b) => b.addEventListener("click", () => mostrar(b.dataset.ir)));

  $("#btn-corazon").addEventListener("click", abrirAnimo);
  $("#btn-otro-animo").addEventListener("click", ponerAnimo);
  $("#btn-cerrar-animo").addEventListener("click", cerrarAnimo);
  $("#btn-voz-animo").addEventListener("click", () => window.Voz.decir(animoPrevio));
  $("#telon").addEventListener("click", (e) => { if (e.target === $("#telon")) cerrarAnimo(); });

  $("#btn-cerrar-carta").addEventListener("click", cerrarCarta);
  $("#btn-voz-carta").addEventListener("click", () => window.Voz.decir(cartaActual));
  $("#telon-carta").addEventListener("click", (e) => { if (e.target === $("#telon-carta")) cerrarCarta(); });

  const btnSonido = $("#btn-sonido");
  const pintarSonido = () => { btnSonido.textContent = Sonido.activo ? "🔔" : "🔕"; };
  btnSonido.addEventListener("click", () => { Sonido.alternar(); pintarSonido(); });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!$("#telon").hidden) cerrarAnimo();
    else if (!$("#telon-carta").hidden) cerrarCarta();
  });

  /* ---------- arranque ---------- */
  aplicarConfig();
  pintarSonido();
  mostrar("inicio");
})();
