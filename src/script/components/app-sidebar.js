import { sidebarStyles } from './componentStyle';

class AppSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [sidebarStyles];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="sidebar-title">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
          <path d="M7 7h10v2H7zM7 11h10v2H7zM7 15h7v2H7z"/>
        </svg>
        Notes
      </div>
      
      <div class="note-item">
        <div class="note-title">Hello Dear</div>
        <div class="recently-viewed">Start your notes</div>
      </div>
    `;
  }
}

customElements.define('app-sidebar', AppSidebar);
