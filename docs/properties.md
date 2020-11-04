authors: Julián Pérez / Iván de Gracia
summary: Conceptos básicos: Propiedades
id: properties
categories: web
tags: codelab,litelement,properties
status: Draft

# Conceptos básicos: Propiedades

Duration: 02:00

LitElement administra slasus propiedades declaradas y sus correspondientes atributos. Por defecto LitElement se encargará de:

* Actualizar el componente cuando cambie cualquier propiedad que se haya declarado.
* Leer los valores instanciados de las propiedades declaradas.
* Inicializar un atributo observado (no reflejado) con el nombre de la propiedad en minúsculas.
* Manejar conversiones de atributos para las propiedades declarado como tipo String, Number, Boolean, Array, y Object.
* Utilizar comparación directa ( oldValue !== newValue) para comprobar los cambios un cualquier propiedad.
* Aplicar las opciones de propiedad y de descriptores de acceso declarados por una superclase.

## Declaración de propiedades

Duration: 02:00

Las propiedades del componente se declaran usando propiedades estáticas:

```js
import { LitElement, html } from 'lit-element';

class MyApp extends LitElement {
  static get properties() {
    return {
      myProp: { type: Array }
    };

  constructor() {
    super();
    this.myProp = [1,2,3];
  }
}
```

o usando decoradores:

```js
import { LitElement, html, property } from 'lit-element';

class MyApp extends LitElement {
  @property({ type: Array reflect: true })
  myProp = [1, 2, 3];
}
```

Negative
: Puedes usar decoradores siempre y cuando utilices TypeScript o un transpilador de código como Babel.

Positive
: Si queremos usar los decoradores en nuestro proyecto deberemos instalar las siguientes plugins

```json
plugins = [
  '@babel/plugin-proposal-class-properties',
  ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
];
```

## Opciones

Duration: 05:00

Las propiedades que declaramos en LitElement tiene nuna serie opciones que pasaremos a detallar a continuación:

1. ```type```: Es el tipo de nuestra propiedad. Puede adquirir los siguientes valores: **String**, **Number**, **Boolean**, **Array** y **Object**. Por defecto la propiedad será *String*

```js
  static get properties() {
    return {
      title: { type: String },
      myArray: { type: Array },
      isActive: { type: Boolean },
      person: { type: Object },
      counter: { type: Number },
    };
  }
}
```

2. ```attribute```: Para manejar nuestra variable por fuera del componente y darle un valor utilizaremos esta propiedad. La diferencia de un atributo con una propiedad es que un atributo siempre estará definido en el HTML mientras que una propiedad se definirá en Javascript.

```js
  static get properties() {
    return {
      title: {
        type: String,
        attribute: 'title-text'
      },
      label: { type: String }
    };
  }

  constructor() {
    super();
    // This is a property
    this.label = 'My Label';
  }

  render() {
    // This is an attribute
    return html`
        <my-app title-text="foo"></my-app>
    `);
  }
}
```

Positive
: Por norma general, un atributo se usa cuando no va a cambiar su valor, mientras que con la propiedad sí puedo cambiar dicho valor.

3. ```reflect```: Esta propiedad sirve para "observar" un atributo de HTML y cambiar su valor de manera instanánea en el propio HTML. Sería como setear una variable y cambiar su valor en tiempo de ejecución. Por defecto, si no se indica lo contrario tomará un valor a ``false``.

```js
import { LitElement, html } from 'lit-element';

class HelloWorld extends LitElement {
  static get properties() { return {
    myProp: { reflect: true }
  };}

  constructor() {
    super();
    // Por defecto al instanciarse el componente tendrá este valor
    this.myProp= 'myProp';
  }

  render() {
    return html`
      <p>${this.myProp}</p>

      <button @click="${this.changeProperty}">Cambiar Valor</button>
    `;
  }

  changeProperty() {
    const randomString = Math.floor(Math.random()*10).toString();

    this.myProp= `myProp: ${randomString}`;
  }

}
```
