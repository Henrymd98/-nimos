/* ============================================================
   Herramientas que usan todas las pantallas.
   Nada de esto hay que editarlo para personalizar el juego.
   ============================================================ */

window.T = (function () {
  "use strict";

  const $  = (sel, raiz) => (raiz || document).querySelector(sel);
  const $$ = (sel, raiz) => [...(raiz || document).querySelectorAll(sel)];

  const alAzar = (lista) => lista[(Math.random() * lista.length) | 0];

  function revolver(lista) {
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  /* Uno distinto al anterior, para que no repita dos veces seguidas */
  function otroDistinto(lista, anterior) {
    if (lista.length < 2) return lista[0];
    let x = alAzar(lista);
    while (x === anterior) x = alAzar(lista);
    return x;
  }

  /* ---- guardado local, que puede fallar en modo privado ---- */
  const almacen = {
    leer(clave, porDefecto) {
      try {
        const crudo = localStorage.getItem("cecy:" + clave);
        return crudo === null ? porDefecto : JSON.parse(crudo);
      } catch (e) { return porDefecto; }
    },
    escribir(clave, valor) {
      try { localStorage.setItem("cecy:" + clave, JSON.stringify(valor)); return true; }
      catch (e) { return false; }
    }
  };

  /* ---- fechas, para el calendario ---- */
  function hoyISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function diasEntre(desdeISO, hastaISO) {
    const a = new Date(desdeISO + "T00:00:00");
    const b = new Date(hastaISO + "T00:00:00");
    return Math.round((b - a) / 86400000);
  }

  /* ---- sonido ---- */
  const Sonido = (function () {
    let ctx = null;
    let activo = almacen.leer("sonido", true);

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
        if (tipo === "bien")       { nota(660, 0, 0.16, 0.13); nota(880, 0.1, 0.22, 0.11); }
        else if (tipo === "mal")   { nota(300, 0, 0.2, 0.09); }
        else if (tipo === "abrir") { nota(520, 0, 0.14, 0.09); nota(784, 0.09, 0.26, 0.08); }
        else if (tipo === "giro")  { nota(440, 0, 0.08, 0.06); }
      } catch (e) { /* sin audio, el juego sigue igual */ }
    }

    return {
      tocar,
      alternar() { activo = !activo; almacen.escribir("sonido", activo); return activo; },
      get activo() { return activo; }
    };
  })();

  function vibrar(patron) {
    if (navigator.vibrate) { try { navigator.vibrate(patron); } catch (e) {} }
  }

  /* ---- navegación entre pantallas ---- */
  const oyentes = {};

  function mostrar(nombre) {
    $$(".pantalla").forEach((p) => p.classList.remove("activa"));
    const destino = $("#pantalla-" + nombre);
    if (!destino) return;
    destino.classList.add("activa");
    document.body.dataset.pantalla = nombre;
    window.scrollTo({ top: 0, behavior: "instant" });
    (oyentes[nombre] || []).forEach((fn) => fn());
  }

  /* para que cada módulo se repinte cuando entran a su pantalla */
  function alEntrar(nombre, fn) {
    (oyentes[nombre] = oyentes[nombre] || []).push(fn);
  }

  /* ---- acentos de color ---- */
  const TONOS = {
    coral: "--coral", menta: "--menta", durazno: "--durazno",
    lavanda: "--lavanda", cielo: "--cielo", miel: "--miel"
  };

  function color(tono) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(TONOS[tono] || TONOS.lavanda).trim();
  }

  function transparente(hex, alfa) {
    const n = parseInt(hex.replace("#", ""), 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alfa})`;
  }

  function pintarAcento(tono) {
    const valor = color(tono);
    document.documentElement.style.setProperty("--acento", valor);
    document.documentElement.style.setProperty("--acento-suave", transparente(valor, 0.16));
  }

  const quieto = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return {
    $, $$, alAzar, revolver, otroDistinto, almacen, hoyISO, diasEntre,
    Sonido, vibrar, mostrar, alEntrar, color, transparente, pintarAcento, quieto
  };
})();
