/* ============================================================
   La voz del celular. Lee en voz alta los mensajes.
   Si el teléfono no tiene voz en español, usa la que haya;
   si no hay ninguna, los botones de audio se esconden solos.
   ============================================================ */
window.Voz = (function () {
  "use strict";

  const soportado = typeof speechSynthesis !== "undefined" &&
                    typeof SpeechSynthesisUtterance !== "undefined";

  let vozElegida = null;

  function elegirVoz() {
    if (!soportado) return null;
    try {
      const voces = speechSynthesis.getVoices() || [];
      vozElegida =
        voces.find((v) => /^es-(419|MX|PE|AR|CO|CL)/i.test(v.lang)) ||
        voces.find((v) => /^es/i.test(v.lang)) ||
        null;
    } catch (e) { vozElegida = null; }
    return vozElegida;
  }

  if (soportado) {
    elegirVoz();
    // en varios navegadores la lista llega un rato después
    try { speechSynthesis.addEventListener("voiceschanged", elegirVoz); } catch (e) {}
  }

  function conNombre(texto) {
    return String(texto).replace(/\{nombre\}/g, window.CONFIG.nombre);
  }

  function decir(texto) {
    if (!soportado) return false;
    try {
      speechSynthesis.cancel();
      const frase = new SpeechSynthesisUtterance(conNombre(texto));
      const v = vozElegida || elegirVoz();
      if (v) { frase.voice = v; frase.lang = v.lang; }
      else frase.lang = "es-ES";
      frase.rate = 0.98;
      frase.pitch = 1.05;
      speechSynthesis.speak(frase);
      return true;
    } catch (e) { return false; }
  }

  function felicitacion() {
    return conNombre(window.T.alAzar(window.MENSAJES.voz));
  }

  return { soportado, decir, conNombre, felicitacion };
})();
