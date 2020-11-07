authors: Julian Pérez / Ivan De Gracia
summary: Práctica final: creación de agenda de contactos
id: agenda
categories: web
tags: codelab,litelement
status: Draft

# Creación de una agenda de contactos

Este codelab está orientado a poner en práctica todos los conceptos que has ido aprendiendo, con el objetivo de crear una aplicación que sirva para gestionar una agenda de contactos.
Para ello, crearemos los diferentes componentes que sean necesarios para construir el componente final, una `Agenda de Contactos`.

## Identificación de componentes necesarios
Duration: 15:00

* Elemento de Contacto
* Listado de Contactos

## Creación del componente `contact-item`
Duration: 60:00

Para la creación de un contacto, deberemos identificar qué datos va a tener nuestro contacto. Para la realización de este ejercicio, necesitaremos una imagen, un nombre y un teléfono.

```javascript
  static get properties() {
    return {
      img: { type: String },
      name: { type: String },
      phone: { type: String }
    };
  }
```

Una vez definidas las propiedades, definimos la platilla que representa al contacto

```javascript
    render() {
      return html`
        <div class="chat-user">
          <div class="chat-user-icon">
          <img src="imagen" alt="">
          </div>
          <div class="chat-user-details centered">
            <div class="chat-username">Nombre</div>
            <div class="chat-username">Telefono</div>
          </div>
        </div>`;
    }
```

Ahora introduciremos un evento click sobre el contacto para que sea reactivo, es decir, al hacer click sobre el contacto, querremos mostrar una información adicional. Para ello declarariamos una variable boolean `isClickedItem`, la cual hará de control para mostrar o no dicha información

```javascript
  static get properties() {
    return {
      isClickedItem: { type: Boolean }
    };
  }
  
  render() {
    return html`
    <div class="chat-user" @click="${this.clickContactItem}">
      <div class="chat-user-icon">
        ${this.img !== 'undefined' ? html`<img src="${this.img}" alt="">` : html`${this.formatName(this.name)}`}
      </div>
      <div class="chat-user-details centered">
        <div class="chat-username">${this.name}</div>
        <div class="chat-username">${this.phone}</div>
      </div>

      ${this.isClickedItem ?
        html`<div class='additional-info'>
          <p>Nombre: <b>${this.name}</b></p>
          <p>Telefono: <b>${this.phone}</b></p>
        </div>` :
        ''}
    </div>
  `;
  }

  clickContactItem(e) {
    this.isClickedItem = !this.isClickedItem;
  }
```

Una vez que tenemos toda la información pintada, deberemos capturar los valores que un componente padre nos va a pasar, es decir, deberemos quitar los valores por defecto que hemos asignado para darles un valor real. (Recordemos que cada elemento de contacto pintará información específica que nos proporpocionará un componente padre). Para ello pondremos `this.{value}` y así leeremos cada uno de los atributos que obtenemos del componente listado.

```javascript
render() {
  return html`
    <div class="chat-user" @click="${this.clickContactItem}">
      <div class="chat-user-icon">
        ${this.img !== 'undefined' ? html`<img src="${this.img}" alt="">` : html`${this.formatName(this.name)}`}
      </div>
      <div class="chat-user-details centered">
        <div class="chat-username">${this.name}</div>
        <div class="chat-username">${this.phone}</div>
      </div>

      ${this.isClickedItem ?
        html`<div class='additional-info'>
          <p>Nombre: <b>${this.name}</b></p>
          <p>Telefono: <b>${this.phone}</b></p>
        </div>` :
        ''}
    </div>
    `;
}
```

Por último aplicamos los estilos css a nuestro componente contacto:

```javascript
  static get styles() {
    return css`
    .chat-user {
      display: flex;
      padding: 1.2rem 2rem;
      cursor: pointer;
      border-radius: 8px;
    }
    .chat-user ~ .chat-user {
      border-top: 1px solid #eee;
    }
    .chat-user-icon {
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;
      background: #303F9F;
      color: white;
      overflow: hidden;
      text-align: center;
      line-height: 4.5rem;
    }
    .chat-user-icon img {
      display: block;
      width: 100%;
      height: 5rem;
    } 
    .centered {
      position: absolute;
      left: 40%;
    }
    .chat-username {
      line-height: 2.5rem;
      margin-left: 30px
    }
    .additional-info {
      margin-top: 15%;
      margin-left: 25%;
    }

    @media only screen and (max-width: 620px){
      .additional-info {
        margin-top: 30%;
      }
    }`;
  }
```

Negative
: Recuerda registrar el componente para que el navegador lo reconozca

## Creación del componente `list-contact`
Duration: 30:00

Para la creación de un listado, vamos a declarar una `Array` el cual contendrá todos los contactos que hemos incorporado. Declararemos una variable `contactList` de tipo `Array`

```javascript
  static get properties() {
    return {
      contactList: { type: Array }
    }
  }
```

Una vez que disponemos de la instacia de nuestro Array, pintaremos en le html cada uno de los objetos declarados en el array.
Para recorrer cada uno de los elementos utilizaremos la propiedad `map` en plantilla.

```javascript
  render() {
    return html`
        ${this.contactList.map(item => html `<contact-item img=${item.img} name=${item.name} phone=${item.phone}></contact-item>`)}`;
  }
```

Por cada iteración declararemos un `contact-item` con todos los parámetros necesarios.

```javascript
  `<contact-item img=${item.img} name=${item.name} phone=${item.phone}></contact-item>`)}
```

Una vez ya renderizado nuestro listado, ortogaremos unos estilos para una correcta visualización final.

```javascript
  static get styles() {
    return css`
      .chat-list {
        width: 100%;
        height: inherit;
        background: #F5F5F5;
      }
      .chats {
        height: auto;
        ovverflow: auto;
        background: #F5F5F5;
      }
    `;
  }
```
