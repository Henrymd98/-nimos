# Trivia de Cecy 🌻

Una trivia para jugar desde el celular, sin instalar nada y sin cronómetro.
Son 48 preguntas repartidas en cinco categorías, más un botón de corazón que
suelta un mensaje de ánimo cuando lo aprietas.

## Cómo se juega

Se abre el link, se elige una categoría y salen 8 preguntas al azar. Después de
cada respuesta aparece un dato curioso, así que igual se aprende algo aunque
falle. Al terminar muestra el puntaje y guarda el mejor de cada categoría en el
mismo celular.

No tiene reloj a propósito: la idea es que distraiga, no que estrese.

## Personalizarla (la parte importante)

Todo el contenido está en dos archivos y se edita con cualquier editor de texto.

### `js/preguntas.js` — las preguntas

La categoría **Cosas de Cecy** viene con ejemplos de relleno; esas son las que
hay que cambiar. Cada pregunta se escribe así:

```js
{
  p: "¿Qué frase dice Cecy todo el tiempo?",
  o: ["“Ya fue”", "“Qué chistoso”", "“No puede ser”", "“Te cuento algo”"],
  r: 3,                       // 0 = primera opción, 1 = segunda, 2, 3
  dato: "Su muletilla favorita, esa que ya le copiaste."
}
```

El único detalle que suele confundir: `r` se cuenta desde 0. Si la respuesta
correcta es la tercera opción, va `r: 2`.

Se pueden agregar todas las preguntas que quieras; el juego arma cada ronda con
8 al azar, así que mientras más haya, menos se repiten.

### `js/mensajes.js` — lo que le dice

Ahí están los saludos de la portada, las reacciones al acertar o fallar, los
cierres según el puntaje y los 20 mensajes del botón de corazón. Esos mensajes
son los que conviene reescribir con tus propias palabras.

## Publicarla en internet

Con GitHub Pages queda un link que se abre desde cualquier celular:

1. En el repositorio, **Settings → Pages**.
2. En *Source* elegir **Deploy from a branch**.
3. Branch: `main`, carpeta `/ (root)`. Guardar.
4. En un par de minutos queda en `https://<usuario>.github.io/<repositorio>/`.

Ese link se manda por WhatsApp y listo. Si además lo agrega a la pantalla de
inicio ("Agregar a inicio" en el menú del navegador), se abre como una app, sin
barra de direcciones.

## Probarla en la compu

No necesita instalar nada, pero conviene abrirla con un servidor local para que
el navegador no bloquee nada:

```bash
python3 -m http.server 8000
# y abrir http://localhost:8000
```

Abrir el `index.html` directamente también funciona.

## Qué hay dentro

```
index.html          la estructura de las cuatro pantallas
css/estilos.css     colores, animaciones, modo oscuro
js/preguntas.js     el contenido del juego  ← editar acá
js/mensajes.js      los mensajes para Cecy  ← y acá
js/app.js           la lógica de las rondas
js/confeti.js       el confeti, hecho a mano para no cargar librerías
manifest.json       para que se pueda instalar en el celular
```

Sin dependencias, sin build, sin npm. Tres archivos de JavaScript que el
navegador lee tal como están, para que abra rápido incluso con mala señal.

## Detalles pensados para el celular

- Modo oscuro automático, según cómo tenga configurado el teléfono.
- Botones grandes, de los que se aciertan con el pulgar.
- Vibración corta al responder, y un sonidito que se puede silenciar con la
  campanita.
- Si el teléfono tiene activado "reducir movimiento", se apagan las animaciones
  y el confeti.
