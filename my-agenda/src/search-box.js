import {
  LitElement,
  html,
  css
} from 'lit-element';

export class SearchBox extends LitElement {

  static get properties() {
    return {
      searchText: {
        type: String
      }
    }
  };

  static get styles() {
    return css `
        * {
            box-sizing: border-box;
        }

        div.box {
            margin: 5px;
        }
        
        div.box input[type=text] {
            padding: 10px;
            font-size: 17px;
            border: 1px solid grey;
            float: left;
            width: 80%;
            background: #f1f1f1;
        }
        
        div.box button {
            float: left;
            border: 0;
            width: 20%;
            padding: 10px;
            background: #043263;
            color: white;
            font-size: 17px;
            border-left: none;
            cursor: pointer;
        }
        
        div.box button:hover {
            background: #0b7dda;
        }`;
  }

  constructor() {
      super();
      this._searchText = searchText;
  }

  render() {
    return html `
        <div class="box">
            <input type="text" placeholder="Nombre o teléfono" name="search">
            <button type="submit">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                </svg>
            </button>
        </div>`;
  }
}

customElements.define('search-box', SearchBox);
