import {
  LitElement,
  html,
  css
} from 'lit-element';

export class MyAgenda extends LitElement {

  static get properties() {
    return {
      title: {
        type: String
      }
    };
  }

  static get styles() {
    return css `
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }

      main {
        flex-grow: 1;
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  render() {
    return html `
      <main>
        <search-box></search-box>
        <list-contact></list-contact>
        <add-contact-button></add-contact-button>
      </main>

      <p class="app-footer">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.bbvanexttechnologies.com/"
          >
          BBVA Next Technologies 2020</a>
      </p>
    `;
  }
}

customElements.define('my-agenda', MyAgenda);
