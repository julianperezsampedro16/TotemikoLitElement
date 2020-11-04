import { LitElement, html, css } from 'lit-element';

export class ListContact extends LitElement {

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

  static get properties() {
    return {
      contactList: { type: Array }
    }
  }

  constructor() {
    super();

    this.contactList = [{
      img: 'https://wowsciencecamp.org/wp-content/uploads/2018/07/dummy-user-img-1-400x400_x_acf_cropped.png',
      name: 'Julián Perez Sampedro',
      phone: '111111111'
    }, {
      name: 'Ivan De Gracia Moreno',
      phone: '222222222'
    }, {
      img: 'https://wowsciencecamp.org/wp-content/uploads/2018/07/dummy-user-img-1-400x400_x_acf_cropped.png',
      name: 'Pedro Luque Dios',
      phone: '333333333'
    }];
  }

  render() {
    return html`
      <div class="chat-list">    
        <div class="chats">
        ${this.contactList.map(item => html `<contact-item img=${item.img} name=${item.name} phone=${item.phone}></contact-item>`)}
        </div>
      </div>
    `;
  }
}

customElements.define('list-contact', ListContact);



