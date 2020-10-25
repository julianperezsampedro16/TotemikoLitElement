authors: Julian Pérez / Ivan De Gracia
summary: Aspectos básicos de mi componente LitElement
id: registro-componente
categories: web
tags: codelab,litelement
status: Draft

# Aspectos básicos de un componente de la clase LitElement

Si abrimos el fichero ``./src/contactInfo.js`` observamos que nuestro componenente llamada `ContactInfo` extiende de la clase `LitElement`.

```js
import { html, css, LitElement } from 'lit-element';

export class ContactInfo extends LitElement {
  ...
}
```

Para que el navegador pueda entender lo que significa la etiqueta `contact-info` nuestro componente debe estar registrado como un [*custom element*](https://developer.mozilla.org/es/docs/Web/Web_Components/Custom_Elements). Este registo se ha declarado en el fichero `./contact-info.js`

```js
import { ContactInfo } from './src/ContactInfo.js';

window.customElements.define('contact-info', ContactInfo);
```

Negative
: El nombre del elemento siempre debe contener al menos un guión

## Renderizado del componente como plantilla
Duration: 01:00

El método `render` define una plantilla o código HTML que se renderizará como parte del componente. En nuestro caso, incluye una cabecera y un botón.
Esta metódo debe ser una función pura, siempre debe devolver la misma plantilla dadas las mismas propiedades. Mediante la función `html` de `lit-htm`
lit-html se crean los elementos en el DOM

```js
  render() {
    return html`
      <h2>${this.title} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
  }
```

## Propiedades del componente
Duration: 01:00

Las propiedades del componente se declaran usando propiedades estáticas:

```js
  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
    };
  }
}
```
