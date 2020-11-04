authors: Julián Pérez / Iván de Gracia
summary: Conceptos básicos: Plantillas
id: templates
categories: web
tags: codelab,litelement,templates
status: Draft

# Conceptos básicos: Plantillas

Duration: 02:00

Al agregar una plantilla a nuestro elemento, se va a generar un DOM interno donde podremos dar funcionalidad a nuestro componente.Para encapsular este DOM, LitElement usa **shadow DOM**. El *shadow DOM* nos ofrece tres ventajas:

* Alcance del DOM. Las API de DOM como *document.querySelector* no encontrarán elementos en el *shadow DOM*, por lo que es más difícil que otros componentes y otras clases rompan oo provoquen fallos colaterales en nuestro componente.

* Alcance de las hojas de estilos. Podemos escribir estilos encapsulados para nuestro *shadow DOM* que no afecten al resto del árbol DOM del documento.

* Composición. El *shadow DOM* del componente (que gestionamos en nuestro componente) estará aislado de los componentes hijos. Podemos agregar y eliminar elementos secundarios mediante las API DOM estándar sin romper accidentalmente nada del *shadow DOM*.
Si el *shadow DOM* nativo no estuviera disponible, LitElement usa un polyfill llamado *Shady CSS*.

## Cómo se renderiza nuestro componente

Duration: 02:00

El método `render` define una plantilla o código HTML que se renderizará como parte del componente.
Mediante la función [html](https://lit-html.polymer-project.org/api/modules/lit_html.html#html) de `lit-html` se insertarán los elementos en el DOM.

Positive
: Solo las partes del DOM que cambian se renderizan nuevamente. Para conseguir esta optimización tu método render debería ser una función pura y siempre tendría que devolver la misma plantilla dadas las mismas propiedades. Esta función solo puede devolver algo que lit-html pueda devolver, por ejemplo un objeto *TemplateResult*. Evita antipatrones que actualicen el DOM fuera del método `render`.

Para más información sobre la sintaxis de `lit-html` puedes consultar su [documentación](https://lit-html.polymer-project.org/guide/template-reference)

Abre el fichero `./my-app.js` y sustituye el código del método `render` por este:

```js
  render() {
    return html`
      <p>Hello world!</p>
    `;
  }
```

## Usando propiedades, condiciones y bucles en nuestra plantilla

Duration: 03:00

Podemos vincular las propiedades del elemento a la plantilla; la plantilla se volvería a renderizar cada vez que cambian las propiedades.

```js
  static get properties() {
    return {
      name: { type: String }
    };
  }

  constructor() {
    super();
    this.name = 'Nexter';
  }

  render() {
    return html`<p>Hello ${this.name}!</p>`;
  }
```

Podemos iterar sobre un array, por ejemplo:

```js
  render() {
    return html`<ul>
      ${['1', '2', '3'].map(i => html`<li>Contact #${i}</li>`)}
    </ul>`;
  }
```

Podemos consultar una condición lógica para renderizar diferentes mensajes, por ejemplo:

```js
  render() {
    return html`
      ${this.myBool?
        html`<p>Hello!</p>`:
        html`<p>Goodbye!</p>`}
    `;
  }
```

## Vincular propiedades a elementos de la plantilla

Duration: 05:00

Podemos insertar expresiones JavaScript como marcadores de posición para contenido de texto HTML, atributos, atributos booleanos, propiedades y manejadores de eventos.

Las expresiones de JavaScript pueden incluir las propiedades de su elemento. `LitElement` observa y reacciona a los cambios en dicha propiedad, por lo que las plantillas se actualizan automáticamente.

El vínculo es siempre unidireccional *one way* (de padre a hijo). Para compartir datos entre un elemento padre y su hijo usaremos **eventos**.

* Vincular una propiedad al contenido de un texto

```js
  render() {
    return html`<div>${this.prop}</div>`;
  }
```

* Vincular una propiedad a un atributo

```js
  render() {
    return html`<div id="${this.prop}">/<div>`;
  }
```

Negative
: Los valores de atributo son siempre *strings*, por lo que al *bindear* un atributo debe devolverse un valor que se pueda convertir en una cadena.

* Vincular una propiedad a un atributo booleano

```js
  render() {
    return html`<input type="text" ?disabled="${this.prop}">`;
  }
```

Negative
: Los atributos booleanos se añaden si la condición es verdadera y se eliminan si se evalúa como falsa.

* Vincular una propiedad a una propiedad

```js
  render() {
    return html`<input type="checkbox" .value="${this.prop}"/>`;
  }
```

* Vincular una propiedad a un evento

```js
  clickHandler(e) {
    console.log(e.target);
  }

  render() {
    return html`
      <button @click="${this.clickHandler}">click!</button>
    `;
  }
```

## Insertar componentes hijos con el elemento <slot>

Duration: 03:00

De forma predeterminada, si un elemento tiene un *shadow tree*, los elementos secundarios no se van a procesar.

```html
<my-app>
  <p>Render me</p>
</my-app>
```

Para poder representar a los elementos hijos, nuestra plantilla debe incluir uno o más elementos `<slot>`, que actúan como marcadores de posición para los nodos secundarios.

```js
  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
```

Podemos asignar a un elemento hijo un `slot` específico. Para ello debemos asignar un atributo `name` a nuestro `<slot>`

* Los *slots* con nombre solo aceptan elementos hijos si el atributo `slot` coincide.
* Los elementos hijos con un atributo `slot` se mostrarán en un `<slot>` con un atributo `name` que coincida.

```js
  render(){
    return html`
      <div>
        <slot name="one"></slot>
        <slot name="two"></slot>
      </div>
    `;
  }
```

```html
<my-app>
  <p slot="one">Include me in slot "one".</p>
  <p slot="nope">This one will not render at all.</p>
  <p>No default slot, so this one won't render either.</p>
</my-app>
```

## Composición de una plantilla a partir de otra plantilla

Duration: 02:00

Podemos componer plantillas de LitElement a partir de otras plantillas de LitElement.

```js
function headerTemplate(title) {
  return html`<header>${title}</header>`;
}
function articleTemplate(text) {
  return html`<article>${text}</article>`;
}
function footerTemplate() {
  return html`<footer>Your footer here.</footer>`;
}

class MyApp extends LitElement {

  static get properties() {
    return {
      title: { type: String },
      text: { type: String }
    };
  }

  render() {
    return html`
      ${headerTemplate(this.title)}
      ${articleTemplate(this.text)}
      ${footerTemplate()}
    `;
  }
}
```

También podemos componer plantillas importando otros elementos y usándolos en la plantilla que queremos

```js
import './my-header.js';
import './my-article.js';
import './my-footer.js';

class MyApp extends LitElement {
  render() {
    return html`
      <my-header></my-header>
      <my-article></my-article>
      <my-footer></my-footer>
    `;
  }
}
```
