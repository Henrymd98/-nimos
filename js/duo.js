/* ============================================================
   Modo dos jugadores en un mismo celular.
   Se turnan pregunta por pregunta; entre una y otra aparece una
   pantalla de "pásale el teléfono" para que nadie vea la
   respuesta del otro.
   ============================================================ */
(function () {
  "use strict";
  const { $, alAzar, letra, revolver, Sonido, vibrar, mostrar, alEntrar, pintarAcento } = window.T;

  const POR_RONDA = 8;                 // 4 preguntas para cada uno
  const duo = { nombres: ["Cecy", "Yo"], cat: null, ronda: [], i: 0,
                puntos: [0, 0], respondida: false };

  const turno = () => duo.i % 2;       // 0 o 1
  const marcador = () =>
    `${duo.nombres[0]} ${duo.puntos[0]} – ${duo.puntos[1]} ${duo.nombres[1]}`;

  function leerNombres() {
    const uno = $("#duo-nombre1").value.trim();
    const dos = $("#duo-nombre2").value.trim();
    duo.nombres = [uno || window.CONFIG.nombre, dos || "Yo"];
  }

  function empezar(cat) {
    leerNombres();
    duo.cat = cat;
    duo.ronda = revolver(cat.preguntas).slice(0, POR_RONDA);
    duo.i = 0;
    duo.puntos = [0, 0];
    pintarAcento(cat.tono);
    pantallaTurno();
  }

  function pantallaTurno() {
    $("#duo-turno-emoji").textContent = turno() === 0 ? "👋" : "🙌";
    $("#duo-turno-nombre").textContent = duo.nombres[turno()];
    $("#duo-turno-texto").textContent = duo.i === 0
      ? "Empiezas tú. Cuando estés lista, dale."
      : "Te toca. Pásale el celular.";
    $("#duo-turno-marcador").textContent = duo.i === 0 ? "" : marcador();
    mostrar("duo-turno");
  }

  function pintarPregunta() {
    const q = duo.ronda[duo.i];
    duo.respondida = false;

    $("#duo-quien").textContent = duo.nombres[turno()];
    $("#duo-contador").textContent = `Pregunta ${duo.i + 1} de ${duo.ronda.length}`;
    $("#duo-marcador").textContent = marcador();
    $("#duo-barra").style.width = (duo.i / duo.ronda.length) * 100 + "%";
    window.Trivia.ponerFoto($("#duo-foto"), q.foto);
    $("#duo-pregunta").textContent = q.p;
    $("#duo-reaccion").hidden = true;

    const cont = $("#duo-opciones");
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

    mostrar("duo-juego");
  }

  function responder(boton, esCorrecta, q) {
    if (duo.respondida) return;
    duo.respondida = true;

    const botones = [...document.querySelectorAll("#duo-opciones .opcion")];
    botones.forEach((b) => { b.disabled = true; if (b !== boton) b.classList.add("apagada"); });

    if (esCorrecta) {
      boton.classList.add("correcta");
      duo.puntos[turno()]++;
      Sonido.tocar("bien");
      vibrar(18);
      const r = boton.getBoundingClientRect();
      window.Confeti.lanzar(30, (r.left + r.width / 2) / innerWidth);
      $("#duo-reaccion-titulo").textContent = `Punto para ${duo.nombres[turno()]}`;
    } else {
      boton.classList.add("incorrecta");
      Sonido.tocar("mal");
      vibrar([12, 60, 12]);
      botones.forEach((b) => {
        if (b.dataset.correcta === "si") { b.classList.remove("apagada"); b.classList.add("correcta"); }
      });
      $("#duo-reaccion-titulo").textContent = alAzar(window.MENSAJES.fallo);
    }

    $("#duo-reaccion-dato").textContent = q.dato;
    $("#duo-siguiente").textContent = duo.i + 1 === duo.ronda.length ? "Ver quién ganó" : "Pasar el turno";
    $("#duo-reaccion").hidden = false;
    setTimeout(() => $("#duo-reaccion").scrollIntoView({ behavior: "smooth", block: "end" }), 120);
    $("#duo-barra").style.width = ((duo.i + 1) / duo.ronda.length) * 100 + "%";
    $("#duo-marcador").textContent = marcador();
  }

  function siguiente() {
    if (!duo.respondida) return;
    if (duo.i + 1 < duo.ronda.length) { duo.i++; pantallaTurno(); }
    else cerrar();
  }

  function cerrar() {
    const [a, b] = duo.puntos;
    let titulo, texto;

    if (a === b) {
      titulo = "Empate";
      texto = "Cuatro a cuatro de gusto. Toca desempate.";
    } else {
      const ganadora = a > b ? duo.nombres[0] : duo.nombres[1];
      titulo = `Ganó ${ganadora}`;
      texto = Math.abs(a - b) === 1
        ? "Por un punto. De esos que duelen."
        : "Sin discusión.";
    }

    $("#duo-final-titulo").textContent = titulo;
    $("#duo-final-marcador").textContent = marcador();
    $("#duo-final-texto").textContent = texto;
    mostrar("duo-final");
    setTimeout(() => window.Confeti.lanzar(90, 0.35), 200);
    setTimeout(() => window.Confeti.lanzar(90, 0.65), 420);
  }

  /* ---------- conexiones ---------- */
  alEntrar("duo", () => {
    $("#duo-nombre1").value = $("#duo-nombre1").value || window.CONFIG.nombre;
    window.Trivia.pintarCategorias($("#duo-categorias"), empezar);
  });

  $("#duo-turno-listo").addEventListener("click", pintarPregunta);
  $("#duo-siguiente").addEventListener("click", siguiente);
  $("#duo-revancha").addEventListener("click", () => empezar(duo.cat));

  document.addEventListener("keydown", (e) => {
    if (!$("#pantalla-duo-juego").classList.contains("activa")) return;
    if (["1", "2", "3", "4"].includes(e.key)) {
      const b = document.querySelectorAll("#duo-opciones .opcion")[+e.key - 1];
      if (b && !b.disabled) b.click();
    }
    if (e.key === "Enter" && duo.respondida) siguiente();
  });
})();
