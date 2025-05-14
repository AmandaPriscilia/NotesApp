class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          margin: 0 auto 30px;
        }
        
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          padding: 15px;
        }
        
        @media (max-width: 900px) {
          .grid-container {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }
        }
        
        @media (max-width: 600px) {
          .grid-container {
            grid-template-columns: 1fr;
            gap: 15px;
            padding: 10px;
          }
        }
      </style>
      <div class="grid-container">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('note-list', NoteList);
