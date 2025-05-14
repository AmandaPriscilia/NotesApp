import { headerStyles } from './componentStyle.js';

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [headerStyles];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `      
      <div class="header-container">
        <h1 class="app-title">${this.getAttribute('title') || 'My Notes App'}</h1>
      </div>
    `;
  }
}

customElements.define('app-header', AppHeader);
