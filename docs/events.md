authors: Julián Pérez / Iván de Gracia
summary: Conceptos básicos: Eventos
id: events
categories: web
tags: codelab,litelement,events
status: Draft

# Conceptos básicos: Eventos

Debemos agregar los escuchadores o *listeners* en un método que sepamos con seguridad que va a activarse antes de que ocurra el evento. Sin embargo, para tener un óptimo rendimiento de carga, deberemos agregar el *listener* lo más tarde posible.

## ¿Dónde añadir los escuchadores de eventos?

Duration: 6:00

Las formas más comunes de agregar *listeners* son:

1. Declarativamente con el *bind* ``@event`` de lit-html: en este caso tendremos una función que recogerá el evento de click, y será en esa función donde haremos las acciones pertinentes.

```js
buttonClick() {
  console.log('Get click event');
}

render() {
  return html`<button @click="${this.buttonClick}">`;
}
```

2. ``constructor``: podemos declarar eventos al inicializar el componente. En este caso el evento se declarará en el constructor. La manera de recoger dicho evento será igual que en el ejemplo anterior, ya que será la función la encargada de hacer las acciones.

```js
buttonClick() {
  console.log('Get click event');
}

constructor() {
  super();

  this.addEventListener('focus', this.buttonClick);
}
```

3. ``connectedCallback``: el método connectedCallback es un hook del ciclo de vida de Web Components. Este hook se lanzará cuando se añade el componente al documento DOM. Este método será utilizado para recoger eventos que puedan propagar componentes hijos y así modificar datos del componente padre.

```js
connectedCallback() {
  super.connectedCallback();
  window.addEventListener('resize', this.buttonClick);
}
disconnectedCallback() {
  window.removeEventListener('resize', this.buttonClick);
  super.disconnectedCallback();
}
```

4. ``firstUpdated``: podremos inicializar eventos en el primer pintado del HTML mediante este hook ``firstUpdated``. De esta manera podremos controlar acciones que ocurran una vez esté pintado el DOM

```js
async firstUpdated() {
  // Give the browser a chance to paint
  await new Promise((r) => setTimeout(r, 0));
  this.addEventListener('click', this._handleClick);
}
```

Negative
: Siempre que queramos invocar a una función en el evento deberemos utilizarla con this.
