/* ============================================================
   Trivia de Cecy — lógica del juego
   ============================================================ */
(function () {
  "use strict";

  const PREGUNTAS_POR_RONDA = 8;
  const TONOS = {
    coral: "--coral", menta: "--menta", durazno: "--durazno",
    lavanda: "--lavanda", cielo: "--cielo"
  };

  const $ = (sel) => document.querySelector(sel);
  const alAzar = (lista) => lista[(Math.random() * lista.length) | 0];

  function revolver(lista) {
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  /* ---------- guardado local (puede fallar en modo privado) ---------- */
  const CLAVE = "trivia-cecy-records";
  function leerRecords() {
    try { return JSON.parse(localStorage.getItem(CLAVE)) || {}; }
    catch (e) { return {}; }
  }
  function guardarRecord(idCat, aciertos) {
    try {
      const r = leerRecords();
      if (!r[idCat] || aciertos > r[idCat]) {
        r[idCat] = aciertos;
        localStorage.setItem(CLAVE, JSON.stringify(r));
        return true;               // récord nuevo
      }
    } catch (e) { /* sin guardado, el juego sigue igual */ }
    return false;
  }

  /* ---------- sonidito ---------- */
  const Sonido = (function () {
    let ctx = null;
    let activo = true;
    try { activo = localStorage.getItem("trivia-cecy-sonido") !== "no"; } catch (e) {}

    function nota(frec, inicio, duracion, volumen) {
      const osc = ctx.createOscillator();
      const gan = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = frec;
      gan.gain.setValueAtTime(0, ctx.currentTime + inicio);
      gan.gain.linearRampToValueAtTime(volumen, ctx.currentTime + inicio + 0.02);
      gan.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + inicio + duracion);
      osc.connect(gan).connect(ctx.destination);
      osc.start(ctx.currentTime + inicio);
      osc.stop(ctx.currentTime + inicio + duracion + 0.02);
    }

    function tocar(tipo) {
      if (!activo) return;
      try {
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === "suspended") ctx.resume();
        if (tipo === "bien") { nota(660, 0, 0.16, 0.13); nota(880, 0.1, 0.22, 0.11); }
        else                 { nota(300, 0, 0.2, 0.09); }
      } catch (e) { /* sin audio y listo */ }
    }

    return {
      tocar,
      alternar() {
        activo = !activo;
        try { localStorage.setItem("trivia-cecy-sonido", activo ? "si" : "no"); } catch (e) {}
        return activo;
      },
      get activo() { return activo; }
    };
  })();

  function vibrar(ms) {
    if (navigator.vibrate) { try { navigator.vibrate(ms); } catch (e) {} }
  }

  /* ---------- pantallas ---------- */
  function mostrar(nombre) {
    document.querySelectorAll(".pantalla").forEach((p) => p.classList.remove("activa"));
    $("#pantalla-" + nombre).classList.add("activa");
    document.body.dataset.pantalla = nombre;
    window.scrollTo({ top: 0, behavior: "instant" });
    if (nombre === "inicio") nuevoSaludo();
  }

  function pintarAcento(tono) {
    const varColor = TONOS[tono] || TONOS.lavanda;
    const valor = getComputedStyle(document.documentElement).getPropertyValue(varColor).trim();
    document.documentElement.style.setProperty("--acento", valor);
    document.documentElement.style.setProperty("--acento-suave", mezclar(valor, 0.16));
  }

  function mezclar(hex, alfa) {
    const n = parseInt(hex.replace("#", ""), 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alfa})`;
  }

  /* ---------- saludo de la portada ---------- */
  let saludoPrevio = "";
  function nuevoSaludo() {
    const caja = $("#saludo");
    let texto = alAzar(window.MENSAJES.bienvenida);
    if (window.MENSAJES.bienvenida.length > 1) {
      while (texto === saludoPrevio) texto = alAzar(window.MENSAJES.bienvenida);
    }
    saludoPrevio = texto;
    caja.style.opacity = 0;
    setTimeout(() => { caja.textContent = texto; caja.style.opacity = 1; }, 180);
  }
  $("#saludo").style.transition = "opacity .35s ease";
  setInterval(() => {
    if ($("#pantalla-inicio").classList.contains("activa") && $("#telon").hidden) nuevoSaludo();
  }, 7000);

  /* ---------- lista de categorías ---------- */
  function pintarCategorias() {
    const cont = $("#lista-categorias");
    const records = leerRecords();
    cont.innerHTML = "";

    window.CATEGORIAS.forEach((cat) => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue(TONOS[cat.tono] || TONOS.lavanda).trim();

      const boton = document.createElement("button");
      boton.className = "tarjeta-cat";
      boton.style.setProperty("--tono", color);
      boton.style.setProperty("--tono-suave", mezclar(color, 0.16));
      boton.innerHTML =
        `<span class="emoji-cat" aria-hidden="true">${cat.emoji}</span>
         <span class="texto-cat">
           <strong>${cat.nombre}</strong>
           <span>${cat.descripcion}</span>
         </span>
         <span class="record">${records[cat.id] ? "Mejor " + records[cat.id] + "/8" : ""}</span>`;
      boton.addEventListener("click", () => empezarRonda(cat));
      cont.appendChild(boton);
    });
  }

  /* ---------- la ronda ---------- */
  const juego = { cat: null, ronda: [], i: 0, aciertos: 0, racha: 0, mejorRacha: 0, respondida: false };

  function empezarRonda(cat) {
    juego.cat = cat;
    juego.ronda = revolver(cat.preguntas).slice(0, PREGUNTAS_POR_RONDA);
    juego.i = 0;
    juego.aciertos = 0;
    juego.racha = 0;
    juego.mejorRacha = 0;
    pintarAcento(cat.tono);
    $("#nombre-cat").textContent = cat.emoji + " " + cat.nombre;
    mostrar("juego");
    pintarPregunta();
  }

  function pintarPregunta() {
    const q = juego.ronda[juego.i];
    const total = juego.ronda.length;
    juego.respondida = false;

    $("#contador").textContent = `Pregunta ${juego.i + 1} de ${total}`;
    $("#racha").textContent = juego.racha >= 2 ? `🔥 ${juego.racha} seguidas` : "";
    $("#barra").style.width = (juego.i / total) * 100 + "%";
    $("#pregunta").textContent = q.p;
    $("#reaccion").hidden = true;

    const cont = $("#opciones");
    cont.innerHTML = "";
    const letras = ["A", "B", "C", "D"];

    revolver(q.o.map((texto, i) => ({ texto, correcta: i === q.r })))
      .forEach((op, idx) => {
        const b = document.createElement("button");
        b.className = "opcion";
        b.dataset.correcta = op.correcta ? "si" : "no";
        b.innerHTML = `<span class="letra" aria-hidden="true">${letras[idx]}</span><span>${op.texto}</span>`;
        b.addEventListener("click", () => responder(b, op.correcta, q));
        cont.appendChild(b);
      });
  }

  function responder(boton, esCorrecta, q) {
    if (juego.respondida) return;
    juego.respondida = true;

    const botones = [...document.querySelectorAll("#opciones .opcion")];
    botones.forEach((b) => { b.disabled = true; if (b !== boton) b.classList.add("apagada"); });

    if (esCorrecta) {
      boton.classList.add("correcta");
      juego.aciertos++;
      juego.racha++;
      juego.mejorRacha = Math.max(juego.mejorRacha, juego.racha);
      Sonido.tocar("bien");
      vibrar(18);
      const r = boton.getBoundingClientRect();
      window.Confeti.lanzar(juego.racha >= 3 ? 55 : 28, (r.left + r.width / 2) / innerWidth);
      $("#reaccion-titulo").textContent = juego.racha >= 3
        ? `${juego.racha} seguidas 🔥`
        : alAzar(window.MENSAJES.acierto);
    } else {
      boton.classList.add("incorrecta");
      juego.racha = 0;
      Sonido.tocar("mal");
      vibrar([12, 60, 12]);
      // mostrarle cuál era la buena
      botones.forEach((b) => {
        if (b.dataset.correcta === "si") {
          b.classList.remove("apagada");
          b.classList.add("correcta");
        }
      });
      $("#reaccion-titulo").textContent = alAzar(window.MENSAJES.fallo);
    }

    $("#reaccion-dato").textContent = q.dato;
    $("#btn-siguiente").textContent = juego.i + 1 === juego.ronda.length ? "Ver resultado" : "Siguiente";
    $("#reaccion").hidden = false;
    setTimeout(() => {
      $("#reaccion").scrollIntoView({ behavior: "smooth", block: "end" });
    }, 120);
    $("#barra").style.width = ((juego.i + 1) / juego.ronda.length) * 100 + "%";
    $("#racha").textContent = juego.racha >= 2 ? `🔥 ${juego.racha} seguidas` : "";
  }

  function siguiente() {
    if (!juego.respondida) return;
    if (juego.i + 1 < juego.ronda.length) { juego.i++; pintarPregunta(); }
    else cerrarRonda();
  }

  function cerrarRonda() {
    const total = juego.ronda.length;
    const esRecord = guardarRecord(juego.cat.id, juego.aciertos);
    const banda = window.MENSAJES.final.find((b) => juego.aciertos >= b.min) ||
                  window.MENSAJES.final[window.MENSAJES.final.length - 1];

    $("#final-aciertos").textContent = juego.aciertos;
    $("#medidor").style.setProperty("--pct", Math.round((juego.aciertos / total) * 100));
    $("#final-titulo").textContent = banda.titulo;
    $("#final-texto").textContent = banda.texto;
    $("#final-nota").innerHTML =
      `${alAzar(window.MENSAJES.animo)}<em>${esRecord ? "Y de paso, récord nuevo en esta categoría." : "Dale al corazón cuando quieras otro."}</em>`;

    mostrar("final");
    if (juego.aciertos >= total * 0.75) {
      setTimeout(() => window.Confeti.lanzar(90, 0.3), 220);
      setTimeout(() => window.Confeti.lanzar(90, 0.7), 460);
    }
    pintarCategorias();
  }

  /* ---------- botón de ánimo ---------- */
  let animoPrevio = "";
  function abrirAnimo() {
    ponerAnimo();
    $("#telon").hidden = false;
    $("#btn-cerrar-animo").focus();
  }
  function ponerAnimo() {
    let texto = alAzar(window.MENSAJES.animo);
    while (texto === animoPrevio && window.MENSAJES.animo.length > 1) {
      texto = alAzar(window.MENSAJES.animo);
    }
    animoPrevio = texto;
    const p = $("#mensaje-animo");
    p.style.opacity = 0;
    setTimeout(() => { p.textContent = texto; p.style.opacity = 1; }, 140);
  }
  $("#mensaje-animo").style.transition = "opacity .3s ease";

  function cerrarAnimo() { $("#telon").hidden = true; }

  /* ---------- conexiones ---------- */
  $("#btn-jugar").addEventListener("click", () => { pintarCategorias(); mostrar("categorias"); });
  $("#btn-siguiente").addEventListener("click", siguiente);
  $("#btn-otra").addEventListener("click", () => empezarRonda(juego.cat));
  $("#btn-corazon").addEventListener("click", abrirAnimo);
  $("#btn-animo-inicio").addEventListener("click", abrirAnimo);
  $("#btn-otro-animo").addEventListener("click", ponerAnimo);
  $("#btn-cerrar-animo").addEventListener("click", cerrarAnimo);
  $("#telon").addEventListener("click", (e) => { if (e.target === $("#telon")) cerrarAnimo(); });

  document.querySelectorAll("[data-ir]").forEach((b) => {
    b.addEventListener("click", () => {
      const destino = b.dataset.ir;
      if (destino === "categorias") pintarCategorias();
      mostrar(destino);
    });
  });

  const btnSonido = $("#btn-sonido");
  function pintarSonido() { btnSonido.textContent = Sonido.activo ? "🔔" : "🔕"; }
  btnSonido.addEventListener("click", () => { Sonido.alternar(); pintarSonido(); });
  pintarSonido();

  document.addEventListener("keydown", (e) => {
    if (!$("#telon").hidden) { if (e.key === "Escape") cerrarAnimo(); return; }
    if (!$("#pantalla-juego").classList.contains("activa")) return;
    if (["1", "2", "3", "4"].includes(e.key)) {
      const b = document.querySelectorAll("#opciones .opcion")[+e.key - 1];
      if (b && !b.disabled) b.click();
    }
    if (e.key === "Enter" && juego.respondida) siguiente();
  });

  /* ---------- arranque ---------- */
  nuevoSaludo();
  pintarCategorias();
})();
