# Para Cecy 🌻

Una app web para el celular, hecha a mano. Se abre desde un link, no se
instala nada y funciona sin cuenta ni contraseña.

Tiene cinco cosas adentro:

| | |
|---|---|
| 🎯 **Trivia** | 54 preguntas en seis categorías. Ocho al azar por ronda, sin cronómetro. |
| 👯 **Dos jugadores** | Un celular, dos personas, turnos alternados y marcador al final. |
| 📅 **Siete días** | Un mensaje nuevo cada día, que se desbloquea solo. |
| 💌 **Cartas** | Sobres con etiqueta: "ábreme cuando no puedas dormir", "cuando estés harta de todo". |
| 🎲 **Ruleta de planes** | Gira y sale un plan, con botón para mandárselo por WhatsApp. |

Y un botón de corazón que flota en la pantalla: donde sea que esté, lo aprieta
y sale un mensaje de ánimo. Casi todos los textos se pueden escuchar en voz
alta, con la voz del propio teléfono.

## Personalizarla

Son tres archivos, todos con comentarios en español. No hace falta saber
programar: es cambiar texto entre comillas.

### `js/config.js` — empieza por acá

Cuatro líneas: el nombre, el emoji de la portada, tu número de WhatsApp y cómo
firmas las cartas. Si dejas el WhatsApp vacío, el botón de la ruleta copia el
plan al portapapeles en vez de abrir el chat.

### `js/mensajes.js` — lo que le dice

Todo lo que la app le habla: los saludos de la portada, las reacciones al
acertar o fallar, los 20 mensajes del corazón, los siete días, las seis cartas
y los ocho planes de la ruleta.

Vale la pena reescribir estos con tus propias palabras. Los que vienen sirven
para que veas el tono, pero los que importan son los tuyos.

### `js/preguntas.js` — las preguntas

Cada una se escribe así:

```js
{
  p: "¿Qué frase dice Cecy todo el tiempo?",
  o: ["“Ya fue”", "“Qué chistoso”", "“No puede ser”", "“Te cuento algo”"],
  r: 3,                       // 0 = primera opción, 1 = segunda, 2, 3
  dato: "Su muletilla favorita, esa que ya le copiaste."
}
```

El detalle que suele confundir: `r` se cuenta desde 0. Si la respuesta correcta
es la tercera opción, va `r: 2`.

La categoría **Cosas de Cecy** viene con ejemplos de relleno; esos son los
primeros que hay que cambiar.

### Fotos

La categoría **¿Dónde estábamos?** muestra una imagen arriba de cada pregunta.
Copia tus fotos en la carpeta `fotos/` y apunta a ellas:

```js
foto: "fotos/playa2023.jpg"
```

Si el archivo no existe todavía, la app no muestra nada y la pregunta funciona
igual. Hay más detalle en `fotos/LEEME.md`.

## Publicarla

Con GitHub Pages queda un link que se abre desde cualquier celular:

1. En el repositorio: **Settings → Pages**.
2. *Source*: **Deploy from a branch**.
3. Branch `main`, carpeta `/ (root)`. Guardar.
4. En dos minutos está en `https://<usuario>.github.io/<repositorio>/`.

Ese link se manda por WhatsApp y listo. Si además lo agrega a la pantalla de
inicio del teléfono, se abre como una app, sin barra de direcciones.

## Probarla en la compu

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Qué hay dentro

```
index.html          las pantallas
css/estilos.css     colores, animaciones, modo oscuro
js/config.js        nombre, WhatsApp, firma        ← editar
js/mensajes.js      todo lo que le dice            ← editar
js/preguntas.js     las preguntas                  ← editar
js/comunes.js       herramientas compartidas
js/trivia.js        la ronda de una persona
js/duo.js           el modo de dos jugadores
js/calendario.js    los siete días
js/cartas.js        los sobres
js/ruleta.js        la ruleta de planes
js/voz.js           leer en voz alta
js/confeti.js       el confeti
js/app.js           navegación y ventanas
fotos/              las fotos de la categoría de recuerdos
```

Sin dependencias, sin build, sin npm. El navegador lee los archivos tal como
están, para que abra rápido incluso con mala señal.

## Detalles pensados para el celular

- Modo oscuro automático, según cómo tenga configurado el teléfono.
- Botones grandes, de los que se aciertan con el pulgar.
- Vibración corta al responder y un sonidito que se silencia con la campanita.
- Si el teléfono tiene activado "reducir movimiento", se apagan las animaciones
  y el confeti, y la ruleta entrega el resultado sin girar.
- Lo que va guardando (récords, días leídos, cartas abiertas) vive en el mismo
  celular. Nada se manda a ningún servidor, porque no hay servidor.
