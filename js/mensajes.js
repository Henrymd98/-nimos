/* ============================================================
   TODO LO QUE LA APP LE DICE A CECY
   Este archivo y preguntas.js son los únicos que hace falta
   editar. Escribe con tus palabras: eso es lo que hace que se
   note que no lo sacaste de internet.
   ============================================================ */

window.MENSAJES = {

  /* Saludos que van rotando en la portada */
  bienvenida: [
    "Alguien pensó en ti hoy.",
    "Esto lo hice para que te distraigas un rato.",
    "Sin apuro, sin reloj. Solo juega.",
    "Hay algo nuevo esperándote aquí adentro.",
    "Bienvenida de vuelta."
  ],

  /* Cuando acierta */
  acierto: [
    "Esa era.", "Obvio que sí.", "Cecy sabe.",
    "Impecable.", "Te la sabías.", "Ni dudaste."
  ],

  /* Cuando falla: suave, sin drama */
  fallo: [
    "Casi.", "Esa estaba difícil.", "Nada grave, sigue.",
    "Ahora ya la sabes.", "Por poquito."
  ],

  /* Cierre de ronda según cuántas acertó (de 8) */
  final: [
    { min: 8, titulo: "Perfecto", texto: "Ocho de ocho. Voy a tener que hacer preguntas más difíciles." },
    { min: 6, titulo: "Muy bien", texto: "Se te da esto. Y todavía quedan categorías por jugar." },
    { min: 4, titulo: "Buena ronda", texto: "Mitad y mitad, que es justo lo divertido. Una más y mejoras." },
    { min: 0, titulo: "Lo importante es el chisme", texto: "Los datos curiosos igual quedan. Ahora tienes con qué sorprender a alguien." }
  ],

  /* El botón del corazón */
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
    "Gracias por ser parte de mi vida. Va en serio.",
    "Eres más querida de lo que te imaginas.",
    "Aquí estoy, aunque no diga nada."
  ],

  /* Lo que dice la voz del celular cuando ella aprieta el botón de audio.
     Usa {nombre} y lo reemplaza solo. */
  voz: [
    "Bien hecho, {nombre}.",
    "Qué orgullo, {nombre}.",
    "Esa te salió redonda, {nombre}.",
    "{nombre}, eres una crack.",
    "Un aplauso para {nombre}."
  ],

  /* ============================================================
     CALENDARIO DE 7 DÍAS
     Se abre uno por día. El primero el día que ella entre.
     ============================================================ */
  sieteDias: [
    {
      titulo: "Día uno",
      texto: "Hice esto porque no se me ocurrió otra forma de estar ahí desde lejos. Ábrelo cuando quieras, todos los días hay uno nuevo. No tienes que responder nada."
    },
    {
      titulo: "Algo que quiero que sepas",
      texto: "Estar mal no te hace una carga. Yo no te quiero por lo bien que la pases; te quiero por cómo eres cuando nadie está mirando."
    },
    {
      titulo: "Una idea para hoy",
      texto: "Sal cinco minutos, aunque sea a la puerta. Sin celular, sin audífonos. No arregla nada, pero el cuerpo lo agradece y a veces con eso basta para destrabar el día."
    },
    {
      titulo: "Un recuerdo",
      texto: "Cámbialo por uno de nosotros: ese día en que nos reímos hasta que nos dolió el estómago, y lo que estábamos haciendo cuando pasó."
    },
    {
      titulo: "Mitad de semana",
      texto: "Si llegaste hasta acá, ya pasaron cuatro días. No sé cómo estuvieron, pero pasaron, y eso ya es algo."
    },
    {
      titulo: "Lo que veo desde acá",
      texto: "Te subestimas todo el tiempo. La Cecy que tú describes y la que ven los demás no son la misma persona, y la de los demás es bastante mejor."
    },
    {
      titulo: "Día siete",
      texto: "Se acabaron los días, pero no la app. El corazón de arriba sigue funcionando, las trivias también, y yo sigo en el mismo número de siempre."
    }
  ],

  /* ============================================================
     CARTAS PARA ABRIR DESPUÉS
     La etiqueta es lo que se ve por fuera del sobre.
     ============================================================ */
  cartas: [
    {
      etiqueta: "cuando no puedas dormir",
      emoji: "🌙",
      texto: "Si son las tres de la mañana y la cabeza no para: no le hagas caso a nada de lo que te diga a esta hora. A las tres de la mañana todo el mundo es un desastre y todos los problemas son enormes. Mañana, con luz, van a medir la mitad. Tómate agua, pon algo aburrido de fondo y deja que el cuerpo haga lo suyo."
    },
    {
      etiqueta: "cuando estés harta de todo",
      emoji: "🌊",
      texto: "Tienes permiso de no poder más. En serio. No tienes que ser fuerte, ni positiva, ni agradecida hoy. Cancela lo que se pueda cancelar, deja lo demás mal hecho por un día y avísame si quieres que te ayude a decir que no."
    },
    {
      etiqueta: "cuando extrañes a alguien",
      emoji: "🕯️",
      texto: "Extrañar es la parte cara de haber querido bien. No trates de apurarlo. Escríbele aunque no lo mandes, mira las fotos si quieres, llora si tienes ganas. Yo te contesto a la hora que sea."
    },
    {
      etiqueta: "cuando te sientas sola",
      emoji: "🧣",
      texto: "Estar sola en un cuarto no es lo mismo que no tener a nadie. Haz la prueba: escríbele a la primera persona que se te venga a la cabeza, cualquier tontería. Casi siempre del otro lado también estaban esperando que alguien escribiera primero."
    },
    {
      etiqueta: "cuando algo te salga bien",
      emoji: "🎉",
      texto: "Esta ábrela solo cuando te pase algo bueno, chico o grande. Quiero que la leas para acordarte de contármelo. Y para que la próxima vez que te digas que nunca te sale nada, te acuerdes de que esta carta ya la abriste."
    },
    {
      etiqueta: "cuando dudes de ti",
      emoji: "🪞",
      texto: "Te lo digo sin adornos: eres buena en lo que haces y eres mucho mejor persona de lo que crees. La voz que te dice lo contrario no es tu criterio, es el cansancio hablando con tu voz."
    }
  ],

  /* ============================================================
     RULETA DE PLANES
     Exactamente 8, que son los gajos de la ruleta.
     "corto" va en la ruleta, "texto" es lo que se manda.
     ============================================================ */
  planes: [
    { corto: "Helado",     texto: "Ir por un helado, aunque haga frío." },
    { corto: "Caminar",    texto: "Caminar sin rumbo una hora, sin mapa y sin apuro." },
    { corto: "Peli mala",  texto: "Ver la peor película que encontremos, a propósito y luego lo comentamos." },
    { corto: "Videollamada", texto: "Hacer una videollamada y fingir que estamos juntos en el mismo lugar." },
    { corto: "Cena", texto: "Pedir la misma comida y cenar juntos por videollamada." },
    { corto: "Película", texto: "Ver una película al mismo tiempo y comentarla como si estuviéramos juntos." },
    { corto: "Cocinar", texto: "Cocinar la misma receta cada uno desde su ciudad." },
    { corto: "Fotos", texto: "Mandarnos fotos de lo que estamos haciendo durante el día." },
    { corto: "Playlist", texto: "Hacer una playlist juntos con canciones que nos recuerden al otro." },
    { corto: "Preguntas", texto: "Hacernos preguntas random hasta terminar hablando de cualquier cosa." },
    { corto: "Karaoke", texto: "Cantar mal, reírnos mucho y fingir que ninguno desafina." },
    { corto: "Juego", texto: "Jugar algo online y competir como si hubiera un premio de verdad." },
    { corto: "Café", texto: "Tomarnos un café juntos, aunque cada uno esté en una ciudad diferente." },
    { corto: "Tour", texto: "Enseñarnos nuestra ciudad por videollamada como si fuera una visita guiada." },
    { corto: "Atardecer", texto: "Buscar un lugar bonito y ver el atardecer juntos por videollamada." },
    { corto: "Carta", texto: "Escribirnos una carta para leerla cuando finalmente nos volvamos a ver." },
    { corto: "Sorpresa", texto: "Mandarnos una pequeña sorpresa sin decir absolutamente nada." },
    { corto: "Cuenta regresiva", texto: "Hacer la cuenta regresiva para el día en que volvamos a vernos." },
    { corto: "Viaje", texto: "Planear nuestro próximo viaje aunque todavía falte bastante." },
    { corto: "Reencuentro", texto: "Imaginar qué vamos a hacer apenas nos volvamos a ver." },
    { corto: "Dormir", texto: "Quedarnos en llamada hasta que uno de los dos se quede dormido." },
    { corto: "Buenos días", texto: "Mandarnos un mensaje apenas despertamos, como si estuviéramos cerca." },
    { corto: "Buenas noches", texto: "Desearnos buenas noches aunque nos separen varios kilómetros." },
    { corto: "Cuenta regresiva", texto: "Contar los días que faltan para poder hacer todos estos planes juntos." }
  ],

  /* Encabezado del mensaje que se manda por WhatsApp */
  invitacion: "La ruleta decidió por nosotros:"
};
