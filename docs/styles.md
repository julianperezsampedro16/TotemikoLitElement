authors: Julián Pérez / Iván de Gracia
summary: Conceptos básicos: Estilos
id: styles
categories: web
tags: codelab,litelement,styles
status: Draft

# Conceptos básicos: Estilos

Duration: 01:00

La plantilla de nuestro componente se representa en un *shadow DOM*. Los estilos que agregaremos a nuestro componente se ajustan automáticamente a ese *shadow DOM*, por lo que no afectaremos a otros elementos de nuestra aplicación.

## Añadir estilos a nuestro componente

Duration: 08:00

Definimos los estilos declarando una propiedad de estilos estáticos llamada `styles`.

El valor de dicha propiedad será devuelta por la función `css`

```js
static get styles() {
    return css`
      div { color: blue; }
    `;
}
```

o a través de un array:

```js
static get styles() {
  return [ css`...`, css`...`];
}
```

Los estilos estáticos se aplican a todas las instancias de un componente. Cualquier expresión en CSS se evalúa una vez y luego se reutiliza para todas las instancias.

Para permitir la personalización de temas o estilos por instancia, podemos usar variables CSS y propiedades personalizadas para crear estilos configurables.

Para evitar que los componentes basados ​​en LitElement evalúen código potencialmente malicioso, la etiqueta `css` solo permite expresiones anidadas que son en sí mismas cadenas o números etiquetados con css.

```js
const mainColor = css`red`;

class MyElement extends LitElement {
  static get styles() {
    return css`
      div { color: ${mainColor} }
    `;
  }
}
```

Esta restricción existe para proteger las aplicaciones de las vulnerabilidades de seguridad mediante las cuales se pueden inyectar estilos maliciosos, o incluso códigos maliciosos, de fuentes no confiables, como parámetros de URL o valores de bases de datos

### Herencia de estilos

Un componente puede heredar los estilos de una superclase LitElement y agregar sus propios estilos:

```js
static get styles() {
    return [
        super.styles,
        css`...`
    ];
}
```

### Estilos compartidos

También podemos compartir estilos entre componentes creando un módulo que exporte los estilos:

```js
// ./src/button-styles.js

import { css } from 'lit-element';

export const buttonStyles = css`
  .blue-button {
    color: white;
    background-color: blue;
  }
  .blue-button:disabled {
    background-color: grey;
  }`;

// ./src/my-element.js

import { buttonStyles } from './button-styles.js';

class MyElement extends LitElement {
  static get styles() {
    return [
      buttonStyles,
      css`
        :host { display: block;
          border: 1px solid black;
        }`
    ]
  }
}

customElements.define('my-element', MyElement);
```

Anque se recomienda colocar los estilos en una propiedad estática para un rendimiento más óptimo, spuede incluir una hoja de estilo externa en su plantilla con la etiqueta <link>:

```js
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  render() {
    return html`
      <link rel="stylesheet" href="./app-styles.css">
      <button>a button</button>
      <div>a div</div>
    `;
  }
}

customElements.define('my-element', MyElement);
```

## Estilos del shadow DOM

Duration: 08:00

Los estilos que agregamos a un componente pueden afectar:

- El árbol de sombras (la plantilla renderizada de su componente).
- El propio componente.
- A hijos del componente.

Los estilos delimitados por el *shadow DOM* de un elemento no afectan al documento principal ni a otros *shadow DOM*. De manera similar, con la excepción de las propiedades CSS heredadas, los estilos a nivel de documento no afectan el contenido de un *shadow DOM*.

Podemos diseñar el propio componente mediante selectores especiales como `:host`. (El elemento que posee o "aloja" un *shadow DOM* se denomina elemento anfitrión).

Para crear estilos predeterminados para el elemento host, utilizamos la pseudo clase CSS `:host` y la función pseudoclase CSS `:host()`.

- `:host` selecciona el elemento anfitrión.

- `:host(selector)` selecciona el elemento del host, pero solo si el elemento del host coincide con el selector.

```js
static get styles() {
  return css`
    /* Selects the host element */
    :host { 
      display: block;
    }

    /* Selects the host element if it is hidden */
    :host([hidden]) {
      display: none;
    }
  `;
}
```

## Clases y estilos dinámicos

Duration: 03:00

Una forma de hacer que los estilos sean dinámicos es agregar enlaces a los atributos `class` o `style` en la plantilla.
La librería `lit-html` nos ofrece dos directivas `classMap` y `styleMap`, para aplicar convenientemente clases y estilos en plantillas HTML.

* classMap aplica un conjunto de clases a un elemento HTML:

```html
<div class=${classMap({alert:true,info:true})}>Content.</div>
<!-- Equivalent: <div class="alert info">Content.</div> -->
```

* styleMap aplica un conjunto de reglas CSS a un elemento HTML:

```html
<button style=${styleMap({
  backgroundColor: 'blue',
  border: '1px solid black'
})}>A button</button>

<!-- Equivalent: 
  <button style="
    background-color:blue;
    border: 1px solid black;
  ">A button</button>
-->
```

Positive
: Para hacer referencia a propiedades con guión como font-family, usaremos el nombre equivalente en camelCase (fontFamily) o colocando el nombre de la propiedad con guión y entre comillas ('font-family').

Positive
: Para hacer referencia a propiedades CSS personalizadas como `--custom-color`, pondremos todo el nombre de la propiedad entre comillas ('--custom-color').

## Temas

Duration: 10:00

Podemos usar la herencia CSS para propagar la información de estilo a los componentes de LitElement y sus plantillas o utilizar variables CSS y propiedades personalizadas (*custom properties*) para configurar estilos por instancia.

### Herencia CSS

La herencia de CSS permite que los elementos principales y del host propaguen ciertas propiedades de CSS a sus descendientes.
No todas las propiedades CSS heredan. Las propiedades CSS heredadas incluyen:

- color
- font-familyy otras font-*propiedades
- Todas las propiedades personalizadas de CSS ( --*)

Podemos usar la herencia CSS para establecer estilos en un elemento ancestro que son heredados por sus descendientes:

```html
<style>
    html {
        font-family: Roboto;
    }
</style>
<div>
  <p>Uses Roboto</p>
</div>
```

De manera similar, los elementos del host transmiten propiedades CSS heredables a los *shadow DOM*.

Puede usar el selector de tipo del elemento anfitrión para darle estilo:

```html
<style>
  my-element { font-family: Roboto; }
</style>
<my-element></my-element>
```

Negative
: Los selectores de tipo tienen mayor especificidad que el pseudo selector :host.

```html
<style>
  my-element { font-family: Courier; }
</style>
<my-element></my-element>
```

```js
class MyElement extends LitElement {
  static get styles() { 
    return css`:host { font-family: Roboto; }`
  }
  render() {
    return html`<p>Will use courier</p>`;
  }
}
```

### Propiedades personalizadas

Todas las propiedades personalizadas de CSS heredan. Podemos usar esto para hacer que los estilos de los componentes se puedan configurar desde fuera.--custom-property-name

```js
class MyElement extends LitElement {
  static get styles() { 
    return css`
      :host { 
        background-color: var(--my-background, yellow);
      }
    `;
  }
  render() {
    return html`<p>Hello world</p>`;
  }
}
```

Podemos establecer el valor de `--my-background`, utilizando la etiqueta `my-element`como selector de CSS:

```html
<style>
  my-element {
    --my-background: rgb(67, 156, 144);
  }
</style>
<my-element></my-element>
```
