import { notesFormStyles } from './componentStyle';

class NotesForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [notesFormStyles];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <form class="notes-form">
        <div class="form-group">
          <input 
            type="text" 
            id="note-title" 
            placeholder="Judul catatan (max 15 karakter)" 
            required 
            maxlength="15"
            aria-label="Judul catatan"
          >
          <div class="char-count" id="title-count">0/15</div>
          <div class="error-message" id="title-error">Judul harus diisi (max 15 karakter)</div>
        </div>
        
        <div class="form-group">
          <textarea 
            id="note-body" 
            placeholder="Isi catatan (max 250 karakter)" 
            rows="4" 
            required
            maxlength="250"
            aria-label="Isi catatan"
          ></textarea>
          <div class="char-count" id="body-count">0/250</div>
          <div class="error-message" id="body-error">Isi catatan harus diisi (max 250 karakter)</div>
        </div>
        
        <button type="submit" id="submit-btn">Simpan Catatan</button>
      </form>
    `;
  }
}
customElements.define('notes-form', NotesForm);
