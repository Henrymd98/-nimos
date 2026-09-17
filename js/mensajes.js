/* ============================================================
   MENSAJES
   Todo lo que el juego le dice a Cecy está aquí.
   Cámbialos por cosas que le dirías tú; eso es lo que hace que
   se sienta hecho a mano.
   ============================================================ */

window.MENSAJES = {

  /* Saludos que rotan en la pantalla de inicio */
  bienvenida: [
    "Alguien pensó en ti hoy.",
    "Esto lo hice para que te distraigas un rato.",
    "Sin apuro, sin reloj. Solo juega.",
    "Ocho preguntas y un par de risas.",
    "Bienvenida, Cecy."
  ],

  /* Cuando acierta */
  acierto: [
    "Esa era.",
    "Obvio que sí.",
    "Cecy sabe.",
    "Impecable.",
    "Te la sabías.",
    "Ni dudaste."
  ],

  /* Cuando falla: suave, sin drama */
  fallo: [
    "Casi.",
    "Esa estaba difícil.",
    "Nada grave, sigue.",
    "Ahora ya la sabes.",
    "Por poquito."
  ],

  /* Cierre según cuántas acertó (de 8) */
  final: [
    { min: 8, titulo: "Perfecto", texto: "Ocho de ocho. Voy a tener que hacer preguntas más difíciles." },
    { min: 6, titulo: "Muy bien", texto: "Se te da esto. Y todavía quedan categorías por jugar." },
    { min: 4, titulo: "Buen ronda", texto: "Mitad y mitad, que es justo lo divertido. Una más y mejoras." },
    { min: 0, titulo: "Lo importante es el chisme", texto: "Los datos curiosos igual quedan. Ahora ya tienes con qué sorprender a alguien." }
  ],

  /* El botón del corazón. Estos son los que de verdad importan. */
  animo: [
    "No tienes que estar bien para ser querida.",
    "Los días grises también se acaban.",
    "Respira. Una cosa a la vez.",
    "Estás haciendo más de lo que reconoces.",
    "Si hoy solo puedes existir, está bien.",
    "Esto que sientes no es para siempre, aunque ahora lo parezca.",
    "Hay gente que se alegra de que existas. Yo, por ejemplo.",
    "Tómate el día con calma. Nadie está midiendo.",
    "No estás atrasada en nada.",
    "Te queda permitido descansar.",
    "Lo difícil no es que seas débil. Es que es difícil.",
    "Un vaso de agua y cinco minutos de sol. En serio ayuda.",
    "Si quieres hablar, escribe. A cualquier hora.",
    "Te he visto salir de cosas peores que esta.",
    "No tienes que resolverlo todo hoy.",
    "Lo que sientes tiene sentido, no lo discutas contigo misma.",
    "Mañana no tiene que ser mejor. Solo tiene que llegar.",
    "Gracias por ser mi amiga. Va en serio.",
    "Eres más querida de lo que te imaginas.",
    "Aquí estoy, aunque no diga nada."
  ]
};
