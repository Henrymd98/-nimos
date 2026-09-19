/* ============================================================
   PREGUNTAS DE LA TRIVIA
   ------------------------------------------------------------
   Este es el único archivo que necesitas tocar para cambiar el
   contenido del juego. Cada pregunta se escribe así:

     {
       p: "La pregunta",
       o: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
       r: 0,                      // posición de la respuesta correcta
                                  // 0 = primera, 1 = segunda, 2, 3
       dato: "Algo curioso que aparece después de responder"
     }

   Ojo con la "r": se cuenta desde 0. Si la respuesta correcta es
   la tercera opción, va r: 2.

   Puedes agregar o borrar preguntas libremente; el juego arma cada
   ronda con 8 al azar de la categoría elegida.
   ============================================================ */

window.CATEGORIAS = [

  /* ----------------------------------------------------------
     CATEGORÍA PARA PERSONALIZAR 💛
     Las de abajo son ejemplos. Cámbialas por cosas de Cecy:
     recuerdos, chistes internos, sus gustos, cosas que solo
     ustedes dos sabrían.
     ---------------------------------------------------------- */
  {
    id: "henry",
    nombre: "Qué tanto sabes de Henry",
    emoji: "🐻",
    tono: "coral",
    descripcion: "Preguntas sobre Henry",
    preguntas: [
      {
        p: "¿Qué es lo primero que hace Henry al despertar?",
        o: ["Revisar el celular", "Estirarse un rato más", "Poner música", "Posponer la alarma 5 min. más", "Ir directo por café"],
        r: 3,
        dato: "Porqué no dormir un poquito más"
      },
      {
        p: "¿Cuál es el plan perfecto de Henry para un domingo?",
        o: ["Dormir hasta tarde", "Salir a caminar", "Maratón de series", "Jugar con sus perros", "Cocinar algo rico"],
        r: 0,
        dato: "Recargar energías es lo esencial."
      },
      {
        p: "Si Henry pudiera viajar mañana, ¿a dónde iría?",
        o: ["A la playa", "A la montaña", "A China", "A un pueblito tranquilo", "A Europa"],
        r: 0,
        dato: "Paz y tranquilidad, su elección favorita."
      },
      {
        p: "¿Qué canción se sabe Henry de memoria?",
        o: ["Una de Shakira", "Una de Taylor Swift", "Una cumbia", "Una de Bad Bunny"],
        r: 2,
        dato: "Siempre va a conciertos de ese género."
      },
      {
        p: "¿Cuál es el cantante favorito de Henry?",
        o: ["Gilberto Santa Rosa", "Agua Marina", "Grupo 5", "José José", "Michael Jackson"],
        r: 2,
        dato: "Siempre la tiene en repeat."
      },
       {
        p: "¿Cuál es el comfort food de Henry?",
        o: ["Helado", "Pizza", "Sopa casera", "Chocolate", "Ceviche"],
        r: 4,
        dato: "Lo que pide y le encanta."
      },
      {
        p: "¿Qué frase dice Henry todo el tiempo?",
        o: ["“Ya fue”", "“Qué chistoso”", "“No puede ser”", "“Tamare”"],
        r: 3,
        dato: "Su muletilla favorita. Esa que ya le copiaste."
      },
      {
        p: "¿Cómo nos conocimos (si te olvidaste te ahorco)?",
        o: ["En el colegio", "En el trabajo", "Por amigos en común", "En una fiesta", "Tradiciones"],
        r: 4,
        dato: "El día que empezó todo esto."
      },
      {
        p: "¿Cuál es la cerveza favorita de Henry?",
        o: ["Pilsen", "Cristal", "Cusqueña de Trigo", "Cusqueña de Light", "San Juan"],
        r: 2,
        dato: "Varias veces la hemos pedido"
      },
      {
        p: "¿Cuál es mi mayor defecto?",
        o: ["Soy impaciente", "Sobrepienso demasiado", "Soy terco", "Procrastino", "Me preocupo demasiado"],
        r: 2,
        dato: "Bueno, pero no me tienen paciencia"
      }, 
      {
        p: "¿Cuál es el género favorito de música de Henry?",
        o: ["Reggaetón", "Salsa", "Cumbia", "Pop", "Huayno"],
        r: 1,
        dato: "Pista: Nunca he ido a un concierto de ese género"
      },    
      {
        p: "Qué regalo me gustaría más recibir",
        o: ["Algo caro", "Algo especial para mí", "Dinero", "Una experiencia"],
        r: 1,
        dato: "Lo maravilloso de la vida es ser querido"
      },
      {
        p: "¿Qué crees que fue lo primero que me impresionó todo?",
        o: ["Me caíste bien inmediatamente", "Pensé que eras seria", "Pensé que eras divertida", "No sabía qué pensar de ti", "De dónde salió?"],
        r: 0,
        dato: "La vida nos trae sorpresas"
      }, 
      {
        p: "¿Qué es o más probable que me acuerde de alguien?",
        o: ["Fechas", "Conversaciones específicas", "Lugar en donde lo conocí", "Ninguna", "Todas"],
        r: 4,
        dato: "La mente a veces es poderosa"
      }, 
      {
        p: "¿Qué cosa sabes que me hace feliz fácilmente?",
        o: ["Comer algo rico", "Siempre dormir", "Conocer un lugar nuevo", "Recibir detalles", "Todas las anteriores"],
        r: 2,
        dato: "Vive la vida y no dejes que la vida te viva tilín"
      }, 
      {
        p: "¿Qué cosa me molesta más?",
        o: ["Que me dejen visto", "Que me mientan", "Que no cumplan su palabra", "Cambio de planes a último minuto"],
        r: 1,
        dato: "Tiene la lengua pegada al paladar con una membrana, así que no la puede asomar."
      }, 
      {
        p: "¿Qué superpoder le gustaría tener a Henry?",
        o: ["Teletransportarse", "Controlar el tiempo", "Leer la mente", "Parar el tiempo", "Curar a la gente"],
        r: 1,
        dato: "Pista: desaparecer del trabajo."
      }
    ]
  },

  {
    id: "animales",
    nombre: "Animales raros",
    emoji: "🐙",
    tono: "menta",
    descripcion: "Cosas que hacen los bichos",
    preguntas: [
      {
        p: "¿Cuántos corazones tiene un pulpo?",
        o: ["Uno", "Dos", "Tres", "Ocho"],
        r: 2,
        dato: "Dos mandan sangre a las branquias y uno al resto del cuerpo. Ese tercero deja de latir cuando el pulpo nada, por eso prefiere caminar."
      },
      {
        p: "¿De qué color es la sangre de un pulpo?",
        o: ["Azul", "Roja", "Verde", "Transparente"],
        r: 0,
        dato: "Usa cobre en vez de hierro para transportar oxígeno, y el cobre tiñe la sangre de azul."
      },
      {
        p: "¿Por qué los flamencos son rosados?",
        o: ["Nacen así", "Por el sol", "Por lo que comen", "Por la sal del agua"],
        r: 2,
        dato: "Los camarones y algas de su dieta tienen pigmentos que se les quedan en las plumas. Nacen grises."
      },
      {
        p: "Las nutrias de mar duermen agarradas de las patas. ¿Para qué?",
        o: ["Para no separarse en la corriente", "Para darse calor", "Para espantar tiburones", "Por costumbre"],
        r: 0,
        dato: "Forman balsas flotantes de decenas de nutrias tomadas entre sí para que la corriente no las lleve."
      },
      {
        p: "¿Qué animal no puede sacar la lengua?",
        o: ["El cocodrilo", "La tortuga", "El pingüino", "El camaleón"],
        r: 0,
        dato: "Tiene la lengua pegada al paladar con una membrana, así que no la puede asomar."
      },
      {
        p: "¿Cuánto mide la lengua de una jirafa?",
        o: ["10 cm", "25 cm", "50 cm", "1 metro"],
        r: 2,
        dato: "Unos 50 cm, y es oscura: el pigmento la protege del sol mientras come."
      },
      {
        p: "En los caballitos de mar, ¿quién lleva a las crías?",
        o: ["La hembra", "El macho", "Los dos", "Ninguno, las dejan"],
        r: 1,
        dato: "El macho tiene una bolsa en el vientre donde se embaraza y después da a luz."
      },
      {
        p: "¿Qué animal se ríe cuando le hacen cosquillas?",
        o: ["El gato", "La rata", "El caballo", "El conejo"],
        r: 1,
        dato: "Las ratas sueltan chillidos agudos, fuera de nuestro rango de audición, cuando juegan o les hacen cosquillas."
      },
      {
        p: "¿Cuál es el animal más grande que ha existido?",
        o: ["El elefante africano", "El tiranosaurio", "La ballena azul", "El calamar gigante"],
        r: 2,
        dato: "Hasta 30 metros. Su corazón pesa más que una persona adulta."
      },
      {
        p: "¿Cuál es el animal terrestre más rápido del mundo?",
        o: ["León", "Guepardo", "Antílope", "Avestruz"],
        r: 1,
        dato: "El guepardo puede alcanzar aproximadamente 100–120 km/h en carreras cortas."
      },
      {
        p: "¿Cuál de estos animales no puede saltar?",
        o: ["Elefante", "Rinoceronte", "Hipopótamo", "Todas las anteriores"],
        r: 0,
        dato: "Los elefantes son conocidos por ser incapaces de realizar un salto en el que las cuatro patas se separen del suelo simultáneamente."
      }, 
      {
        p: "¿Cuál de estos animales puede regenerar partes importantes de su cuerpo?",
        o: ["Ajolote", "Águila", "Gorila", "Jirafa"],
        r: 0,
        dato: "El ajolote puede regenerar extremidades y también reparar tejidos de órganos como el corazón y partes del sistema nervioso."
      },
      {
        p: "¿Qué animal tiene uno de los períodos de gestación más largos entre los mamíferos terrestres?",
        o: ["Jirafa", "Elefante", "Rinoceronte", "Yegua", "Vaca"],
        r: 1,
        dato: "La gestación de una elefanta dura aproximadamente 22 meses."
      },
      {
        p: "¿Qué animal es famoso por “hacerse el muerto” cuando se siente amenazado?",
        o: ["Zorrillo", "Mapache", "Zarigueya", "Erizo", "Perro"],
        r: 2,
        dato: "Puede entrar involuntariamente en un estado parecido a la inmovilidad o tanatosis, aparentando estar muerta para disuadir a un depredador."
      },  
      {
        p: "¿Cuánto puede vivir una tortuga gigante?",
        o: ["30 años", "50 años", "80 años", "Más de 100 años"],
        r: 3,
        dato: "Varias han pasado el siglo y siguen. Hay registros de más de 170 años."
      }
    ]
  },

  {
    id: "comida",
    nombre: "Comida",
    emoji: "🍫",
    tono: "durazno",
    descripcion: "De dónde sale lo que comemos",
    preguntas: [
      {
        p: "¿De dónde es originaria la papa?",
        o: ["Irlanda", "Los Andes", "China", "España"],
        r: 1,
        dato: "De la zona andina, entre Perú y Bolivia. Existen más de 3000 variedades."
      },
      {
        p: "¿Dónde se empezó a tomar el chocolate?",
        o: ["Suiza", "Mesoamérica", "Bélgica", "África"],
        r: 1,
        dato: "Los mayas y los mexicas lo tomaban amargo y con ají, muy lejos del chocolate dulce de hoy."
      },
      {
        p: "¿Cuál es la especia más cara del mundo?",
        o: ["Vainilla", "Cardamomo", "Azafrán", "Canela"],
        r: 2,
        dato: "Se cosecha a mano: hacen falta unas 150 flores para un gramo."
      },
      {
        p: "¿Por qué las manzanas flotan en el agua?",
        o: ["Por la cáscara", "Porque son 25% aire", "Por el azúcar", "Por su forma"],
        r: 1,
        dato: "Una cuarta parte de su volumen es aire, así que pesan menos que el agua que desplazan."
      },
      {
        p: "¿Cuánto tiempo se puede conservar la miel sin echarse a perder?",
        o: ["Un año", "Cinco años", "Veinte años", "Indefinidamente"],
        r: 3,
        dato: "En tumbas egipcias encontraron miel de más de 3000 años todavía comestible: casi no tiene agua y es muy ácida."
      },
      {
        p: "Botánicamente, el tomate es…",
        o: ["Una verdura", "Una fruta", "Un tubérculo", "Una semilla"],
        r: 1,
        dato: "Y la palta también: es una baya de una sola semilla."
      },
      {
        p: "¿Qué le da el picante al ají?",
        o: ["Capsaicina", "Cafeína", "Ácido cítrico", "Las semillas"],
        r: 0,
        dato: "No es sabor, es dolor: la capsaicina activa los receptores de calor de la lengua."
      },
      {
        p: "¿De qué país es el tiramisú?",
        o: ["Francia", "Italia", "Grecia", "Austria"],
        r: 1,
        dato: "Del norte de Italia, y su nombre significa algo así como “levántame el ánimo”."
      },
      {
        p: "El pistacho es pariente cercano de…",
        o: ["La almendra", "El mango", "El maní", "La avellana"],
        r: 1,
        dato: "Los dos son de la familia de las anacardiáceas, igual que el marañón."
      },
      {
        p: "¿Qué fruta tiene más vitamina C que una naranja?",
        o: ["El kiwi", "La manzana", "El plátano", "La uva"],
        r: 0,
        dato: "Casi el doble por cada 100 gramos. El camu camu peruano le gana a las dos por mucho."
      }
    ]
  },

  {
    id: "curiosidades",
    nombre: "No lo vas a creer",
    emoji: "🪐",
    tono: "lavanda",
    descripcion: "Datos para contarle a alguien hoy",
    preguntas: [
      {
        p: "¿De qué color es el atardecer en Marte?",
        o: ["Rojo", "Naranja", "Azul", "Verde"],
        r: 2,
        dato: "El polvo marciano dispersa la luz al revés que nuestra atmósfera: cielo rojizo de día, atardecer azul."
      },
      {
        p: "En Venus, ¿qué dura más?",
        o: ["Un día", "Un año", "Duran igual", "No tiene días"],
        r: 0,
        dato: "Gira tan lento que un día venusiano equivale a 243 días terrestres, y su año a 225."
      },
      {
        p: "¿Cuánto tarda la luz del Sol en llegar a la Tierra?",
        o: ["8 segundos", "8 minutos", "8 horas", "Llega al instante"],
        r: 1,
        dato: "Poco más de 8 minutos. Cuando ves el Sol, lo estás viendo como era hace 8 minutos."
      },
      {
        p: "¿Cuántos huesos tiene una persona adulta?",
        o: ["186", "206", "256", "300"],
        r: 1,
        dato: "Al nacer tenemos unos 300, pero varios se van fusionando con los años."
      },
      {
        p: "La Torre Eiffel en verano…",
        o: ["Se inclina al norte", "Crece unos 15 cm", "Cambia de color", "Se cierra por el calor"],
        r: 1,
        dato: "El hierro se expande con el calor, así que en verano es un poco más alta que en invierno."
      },
      {
        p: "¿Qué tienen los koalas casi idéntico a nosotros?",
        o: ["Las huellas digitales", "El ADN", "El corazón", "La dentadura"],
        r: 0,
        dato: "Sus huellas son tan parecidas que pueden confundirse con las humanas en una escena."
      },
      {
        p: "¿Por qué los plátanos son ligeramente radiactivos?",
        o: ["Por el potasio", "Por los pesticidas", "Por la cáscara", "Por el transporte"],
        r: 0,
        dato: "Contienen potasio-40. La dosis es tan chica que hace falta una barbaridad de plátanos para notarla."
      },
      {
        p: "¿Cuál es el planeta más caliente del sistema solar?",
        o: ["Mercurio", "Venus", "Marte", "Júpiter"],
        r: 1,
        dato: "No es el más cercano al Sol: su atmósfera de CO₂ atrapa el calor y lo deja en unos 460 °C."
      },
      {
        p: "¿Qué país tiene más husos horarios?",
        o: ["Rusia", "Estados Unidos", "Francia", "China"],
        r: 2,
        dato: "Doce, contando sus territorios repartidos por todo el mundo. China, aunque es enorme, usa uno solo."
      },
      {
        p: "¿Cuál es el océano más grande?",
        o: ["Atlántico", "Índico", "Pacífico", "Ártico"],
        r: 2,
        dato: "Cabe toda la tierra firme del planeta dentro y todavía sobra espacio."
      }
    ]
  },

  {
    id: "pop",
    nombre: "Música y pelis",
    emoji: "🎬",
    tono: "cielo",
    descripcion: "Lo que todos cantamos mal",
    preguntas: [
      {
        p: "¿Quién canta “Hips Don't Lie”?",
        o: ["Rosalía", "Shakira", "Karol G", "Jennifer Lopez"],
        r: 1,
        dato: "Salió en 2006 y la puso primera en las listas de medio mundo."
      },
      {
        p: "¿De qué película es “Let It Go”?",
        o: ["Encanto", "Moana", "Frozen", "Enredados"],
        r: 2,
        dato: "La escribieron en un día, caminando por el parque, y terminó cambiando el final de la película."
      },
      {
        p: "¿Qué banda grabó “Bohemian Rhapsody”?",
        o: ["The Beatles", "Queen", "Pink Floyd", "The Rolling Stones"],
        r: 1,
        dato: "Casi seis minutos y sin estribillo repetido. La disquera decía que ninguna radio la iba a pasar."
      },
      {
        p: "¿Cuántas teclas tiene un piano?",
        o: ["66", "76", "88", "96"],
        r: 2,
        dato: "52 blancas y 36 negras."
      },
      {
        p: "¿Quién dirigió Titanic?",
        o: ["Steven Spielberg", "James Cameron", "Ridley Scott", "Martin Scorsese"],
        r: 1,
        dato: "Bajó él mismo a los restos reales del barco: las tomas del naufragio en la película son suyas."
      },
      {
        p: "¿En qué ciudad viven los personajes de Friends?",
        o: ["Chicago", "Los Ángeles", "Boston", "Nueva York"],
        r: 3,
        dato: "El edificio del departamento existe y está en Greenwich Village."
      },
      {
        p: "¿Quién dirigió Mi vecino Totoro?",
        o: ["Hayao Miyazaki", "Makoto Shinkai", "Isao Takahata", "Satoshi Kon"],
        r: 0,
        dato: "Totoro terminó siendo el logo de Studio Ghibli."
      },
      {
        p: "¿En qué país nació el reggae?",
        o: ["Cuba", "Jamaica", "Brasil", "Trinidad y Tobago"],
        r: 1,
        dato: "En los barrios de Kingston, a fines de los sesenta."
      },
      {
        p: "¿Cómo se llama el hermano de Simba en El Rey León?",
        o: ["Nala", "Mufasa", "No tiene hermano", "Scar"],
        r: 2,
        dato: "Scar es su tío. Mufasa es el papá y Nala su amiga de toda la vida."
      },
      {
        p: "¿Qué cantante lanzó el álbum “1989”?",
        o: ["Adele", "Taylor Swift", "Lana del Rey", "Katy Perry"],
        r: 1,
        dato: "Lo nombró por su año de nacimiento, y años después lo volvió a grabar completo."
      }
    ]
  }

];
