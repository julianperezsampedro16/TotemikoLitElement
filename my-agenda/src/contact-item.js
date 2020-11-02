import { LitElement, html, css } from 'lit-element';

export class ContactItem extends LitElement {

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

	static get properties() {
		return {
			img: { type: String },
			name: { type: String },
			phone: { type: String },
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

	formatName(name) {
		return name.charAt(0);
	}

	clickContactItem() {
		this.isClickedItem = !this.isClickedItem;
	}
}

customElements.define('contact-item', ContactItem);