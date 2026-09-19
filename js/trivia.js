/* ============================================================
   La ronda de una sola persona.
   ============================================================ */
(function () {
  "use strict";
  const { $, alAzar, letra, revolver, almacen, Sonido, vibrar, mostrar, alEntrar,
          color, transparente, pintarAcento } = window.T;

  const POR_RONDA = 8;
  const juego = { cat: null, ronda: [], i: 0, aciertos: 0, racha: 0, respondida: false };

  /* ---------- lista de categorías ---------- */
  function pintarCategorias(contenedor, alElegir) {
    const records = almacen.leer("records", {});
    contenedor.innerHTML = "";

    window.CATEGORIAS.forEach((cat) => {
      const tono = color(cat.tono);
      const boton = document.createElement("button");
      boton.className = "tarjeta-cat";
      boton.style.setProperty("--tono", tono);
      boton.style.setProperty("--tono-suave", transparente(tono, 0.16));
      boton.innerHTML =
        `<span class="emoji-cat" aria-hidden="true">${cat.emoji}</span>
         <span class="texto-cat">
           <strong>${cat.nombre}</strong>
           <span>${cat.descripcion}</span>
         </span>
         <span class="record">${records[cat.id] ? "Mejor " + records[cat.id] + "/" + Math.min(POR_RONDA, cat.preguntas.length) : ""}</span>`;
      boton.addEventListener("click", () => alElegir(cat));
      contenedor.appendChild(boton);
    });
  }

  /* ---------- foto de la pregunta, si tiene ---------- */
  function ponerFoto(elemento, ruta) {
    if (!ruta) { elemento.hidden = true; elemento.removeAttribute("src"); return; }
    elemento.hidden = false;
    elemento.src = ruta;
    elemento.onerror = () => { elemento.hidden = true; };   // si la foto no existe, ni se nota
  }

  /* ---------- ronda ---------- */
  function empezar(cat) {
    juego.cat = cat;
    juego.ronda = revolver(cat.preguntas).slice(0, POR_RONDA);
    juego.i = 0;
    juego.aciertos = 0;
    juego.racha = 0;
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
    ponerFoto($("#foto-pregunta"), q.foto);
    $("#pregunta").textContent = q.p;
    $("#reaccion").hidden = true;

    const cont = $("#opciones");
    cont.innerHTML = "";

    revolver(q.o.map((texto, i) => ({ texto, correcta: i === q.r })))
      .forEach((op, idx) => {
        const b = document.createElement("button");
        b.className = "opcion";
        b.dataset.correcta = op.correcta ? "si" : "no";
        b.innerHTML = `<span class="letra" aria-hidden="true">${letra(idx)}</span><span>${op.texto}</span>`;
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
      botones.forEach((b) => {
        if (b.dataset.correcta === "si") { b.classList.remove("apagada"); b.classList.add("correcta"); }
      });
      $("#reaccion-titulo").textContent = alAzar(window.MENSAJES.fallo);
    }

    $("#reaccion-dato").textContent = q.dato;
    $("#btn-siguiente").textContent = juego.i + 1 === juego.ronda.length ? "Ver resultado" : "Siguiente";
    $("#reaccion").hidden = false;
    setTimeout(() => $("#reaccion").scrollIntoView({ behavior: "smooth", block: "end" }), 120);
    $("#barra").style.width = ((juego.i + 1) / juego.ronda.length) * 100 + "%";
    $("#racha").textContent = juego.racha >= 2 ? `🔥 ${juego.racha} seguidas` : "";
  }

  function siguiente() {
    if (!juego.respondida) return;
    if (juego.i + 1 < juego.ronda.length) { juego.i++; pintarPregunta(); }
    else cerrar();
  }

  function cerrar() {
    const total = juego.ronda.length;
    const records = almacen.leer("records", {});
    const esRecord = !records[juego.cat.id] || juego.aciertos > records[juego.cat.id];
    if (esRecord) { records[juego.cat.id] = juego.aciertos; almacen.escribir("records", records); }

    // las bandas de mensajes están escritas sobre 8; si la ronda fue más
    // corta se compara con la nota equivalente
    const equivalente = Math.round((juego.aciertos / total) * POR_RONDA);
    const banda = window.MENSAJES.final.find((b) => equivalente >= b.min) ||
                  window.MENSAJES.final[window.MENSAJES.final.length - 1];

    $("#final-aciertos").textContent = juego.aciertos;
    $("#final-total").textContent = total;
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
  }

  /* ---------- conexiones ---------- */
  alEntrar("categorias", () => pintarCategorias($("#lista-categorias"), empezar));
  $("#btn-siguiente").addEventListener("click", siguiente);
  $("#btn-otra").addEventListener("click", () => empezar(juego.cat));
  $("#btn-voz-final").addEventListener("click", () => window.Voz.decir(window.Voz.felicitacion()));

  document.addEventListener("keydown", (e) => {
    if (!$("#pantalla-juego").classList.contains("activa")) return;
    if (["1", "2", "3", "4"].includes(e.key)) {
      const b = document.querySelectorAll("#opciones .opcion")[+e.key - 1];
      if (b && !b.disabled) b.click();
    }
    if (e.key === "Enter" && juego.respondida) siguiente();
  });

  /* lo comparte con el modo de dos jugadores */
  window.Trivia = { pintarCategorias, ponerFoto };
})();
