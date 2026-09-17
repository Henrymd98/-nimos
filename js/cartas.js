/* ============================================================
   Cartas para abrir después. Cada sobre dice cuándo abrirlo.
   ============================================================ */
(function () {
  "use strict";
  const { $, almacen, Sonido, vibrar, alEntrar } = window.T;

  const abiertas = () => almacen.leer("cartas-abiertas", []);

  function abrir(indice) {
    const carta = window.MENSAJES.cartas[indice];
    const ya = abiertas();
    if (!ya.includes(indice)) { ya.push(indice); almacen.escribir("cartas-abiertas", ya); }
    Sonido.tocar("abrir");
    vibrar(15);
    window.abrirCarta({
      emoji: carta.emoji,
      titulo: "Para " + carta.etiqueta,
      texto: carta.texto
    });
    pintar();
  }

  function pintar() {
    const cont = $("#sobres");
    const ya = abiertas();
    cont.innerHTML = "";

    window.MENSAJES.cartas.forEach((carta, i) => {
      const b = document.createElement("button");
      b.className = "sobre" + (ya.includes(i) ? " abierta" : "");
      b.innerHTML =
        `<span class="solapa" aria-hidden="true"></span>
         <span class="emoji-sobre" aria-hidden="true">${carta.emoji}</span>
         <span class="etiqueta-sobre">Ábreme ${carta.etiqueta}</span>`;
      b.addEventListener("click", () => abrir(i));
      cont.appendChild(b);
    });
  }

  alEntrar("cartas", pintar);
})();
