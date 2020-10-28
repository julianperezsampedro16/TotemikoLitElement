import {
  LitElement,
  html,
  css
} from 'lit-element';

export class AddContactButton extends LitElement {

  static get styles() {
    return css `
      .floating-button {
        position: fixed;
        font-size: 24px;
        width: 60px;
        height: 60px;
        bottom: 40px;
        right: 40px;
        background-color: #02a5a5;
        color: #FFF;
        border-radius: 50px;
        text-align: center;
        box-shadow: 2px 2px 3px #999;
      }
      
      .floating-button svg {
        margin-top: 16px;
      }`;


  }

  render() {
    return html `
        <div class="floating-button">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
          </svg>
        </div>`;
  }
}

customElements.define('add-contact-button', AddContactButton);



