class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
    :host {
      display: block;
      width: 100%; 
      margin: 0; 
    }
    
    div {
      padding: 12px 0px;
      background-color: #102C57;
      color: white;
      text-align: center;
      font-size: 14px;
    }
  `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
      <div>
        Mndprscl &copy; 2025
      </div>
    `;
  }
}

customElements.define('footer-bar', FooterBar);
