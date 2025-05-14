import { Utils } from '../utils.js';
import { noteItemStyles } from './componentStyle.js';

class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [noteItemStyles];
    this.note = null;
  }

  static get observedAttributes() {
    return ['note'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'note' && oldValue !== newValue) {
      try {
        this.note = newValue ? JSON.parse(newValue) : null;
        this.render();
      } catch (error) {
        console.error('Failed to parse note data:', error);
        this.note = null;
        this.renderErrorState();
      }
    }
  }

  connectedCallback() {
    if (!this.note) {
      this.attributeChangedCallback('note', null, this.getAttribute('note'));
    }
  }

  render() {
    if (!this.note) {
      this.renderEmptyState();
      return;
    }

    const formattedDate = Utils.formatDate(this.note.createdAt);
    const isArchived = this.note.archived || false;
    this.style.setProperty('--note-header-bg', isArchived ? '#bbdefb' : '#FFB1B1');

    this.shadowRoot.innerHTML = `
      <div class="note-header" aria-labelledby="note-title-${this.note.id}" data-aos="fade-down">
        <h3 class="note-title" id="note-title-${this.note.id}">${this.note.title || 'Untitled Note'}</h3>
        <div class="note-date">${formattedDate}</div>
      </div>
      
      <div class="note-content-container" data-aos="fade-down" data-aos-delay="100">
        <p class="note-content">${this.note.body || ''}</p>
      </div>
      
      <div class="note-actions" data-aos="zoom-in" data-aos-delay="200">
        <button class="${isArchived ? 'unarchive-btn' : 'archive-btn'}" 
                data-id="${this.note.id}"
                aria-label="${isArchived ? 'Batal arsip catatan' : 'Arsipkan catatan'}">
          ${isArchived ? 'Batal Arsip' : 'Arsip'}
        </button>
        <button class="delete-btn" 
                data-id="${this.note.id}"
                aria-label="Hapus catatan">
          Hapus
        </button>
      </div>
    `;

    this.setupEventListeners();
    this.refreshAOS();
  }

  renderEmptyState() {
    this.shadowRoot.innerHTML = `
      <div class="note-header">
        <h3 class="note-title">Empty Note</h3>
      </div>
      <div class="note-content-container">
        <p class="note-content">No content available</p>
      </div>
    `;
  }

  renderErrorState() {
    this.shadowRoot.innerHTML = `
      <div class="note-header" style="background-color: #ffebee;">
        <h3 class="note-title">Error Loading Note</h3>
      </div>
      <div class="note-content-container">
        <p class="note-content">Failed to load note data</p>
      </div>
    `;
  }

  refreshAOS() {
    if (window.AOS) {
      setTimeout(() => AOS.refresh(), 0);
    }
    this.setupEventListeners();
  }

  setupEventListeners() {
    const archiveBtn = this.shadowRoot.querySelector('.archive-btn, .unarchive-btn');
    archiveBtn.addEventListener('click', (e) => {
      const eventName = this.note.archived ? 'note-unarchive' : 'note-archive';
      this.dispatchEvent(
        new CustomEvent(eventName, {
          detail: e.target.dataset.id,
          bubbles: true,
          composed: true,
        })
      );
    });

    this.shadowRoot.querySelector('.delete-btn').addEventListener('click', (e) => {
      this.dispatchEvent(
        new CustomEvent('note-delete', {
          detail: e.target.dataset.id,
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define('note-item', NoteItem);
