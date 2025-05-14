import NotesApi from '../script/data/remote/notes-api.js';
import { Utils } from '../script/utils.js';

function home() {
  // Get UI elements
  const notesForm = document.querySelector('notes-form');
  const notesList = document.getElementById('notes-list');

  const notesContainer = document.createElement('div');
  notesContainer.className = 'notes-container';

  notesContainer.innerHTML = `
    <div class="notes-nav">
      <button class="nav-btn active" data-view="active">My Notes</button>
      <button class="nav-btn" data-view="archived">Arsip</button>
    </div>
  `;

  const loadingIndicator = createLoadingIndicator();
  const errorMessage = createErrorMessage();
  const emptyMessage = createEmptyMessage();

  notesList.parentNode.insertBefore(notesContainer, notesList);
  notesContainer.appendChild(notesList);
  notesContainer.appendChild(loadingIndicator);
  notesContainer.appendChild(errorMessage);
  notesContainer.appendChild(emptyMessage);

  let currentView = 'active';

  const renderNotes = async () => {
    try {
      Utils.showElement(loadingIndicator);
      Utils.hideElement(notesList);
      Utils.hideElement(emptyMessage);
      Utils.hideElement(errorMessage);

      console.log('Fetching notes for view:', currentView);

      const notes = currentView === 'active' ? await NotesApi.getNotes() : await NotesApi.getArchivedNotes();

      console.log('Notes received:', notes);

      Utils.emptyElement(notesList);

      if (!notes || notes.length === 0) {
        emptyMessage.textContent = currentView === 'active' ? 'Tidak ada catatan' : 'Tidak ada catatan di arsip';
        Utils.showElement(emptyMessage);
      } else {
        if (Array.isArray(notes)) {
          notes.forEach((note) => {
            const noteItem = document.createElement('note-item');
            noteItem.setAttribute('note', JSON.stringify(note));
            notesList.appendChild(noteItem);
          });
          Utils.showElement(notesList);
        } else {
          throw new Error('Data notes bukan array');
        }
      }
    } catch (error) {
      console.error('Error loading notes:', error);
      errorMessage.textContent = `Error: ${error.message}`;
      Utils.showElement(errorMessage);
    } finally {
      Utils.hideElement(loadingIndicator);
    }
  };

  // Event handlers
  const handleNoteAction = async (e) => {
    let targetButton;
    let targetId;

    if (e.type === 'note-create') {
      const formElement = document.querySelector('notes-form');
      if (formElement && formElement.shadowRoot) {
        targetButton = formElement.shadowRoot.querySelector('#submit-btn');
      }
    } else if (['note-delete', 'note-archive', 'note-unarchive'].includes(e.type)) {
      targetId = e.detail;
      const noteItem = document.querySelector(`note-item[note*="${targetId}"]`);

      if (noteItem && noteItem.shadowRoot) {
        if (e.type === 'note-delete') {
          targetButton = noteItem.shadowRoot.querySelector('.delete-btn');
        } else if (e.type === 'note-archive' || e.type === 'note-unarchive') {
          targetButton = noteItem.shadowRoot.querySelector('.archive-btn, .unarchive-btn');
        }
      }
    }

    // loading tombol
    if (targetButton) {
      targetButton.classList.add('btn-loading');
      targetButton.disabled = true;
    }

    try {
      Utils.showElement(loadingIndicator);

      switch (e.type) {
        case 'note-create':
          const response = await NotesApi.createNote(e.detail.title, e.detail.body);
          const responseData = response.data;
          await renderNotes();
          if (responseData && responseData.id) {
            highlightNewNote(responseData.id);
          }
          showToast('Catatan berhasil dibuat!', 'success');
          break;

        case 'note-delete':
          await NotesApi.deleteNote(e.detail);
          await renderNotes();
          showToast('Catatan berhasil dihapus', 'success');
          break;

        case 'note-archive':
          await NotesApi.archiveNote(e.detail);
          await renderNotes();
          showToast('Catatan berhasil diarsipkan', 'success');
          break;

        case 'note-unarchive':
          await NotesApi.unarchiveNote(e.detail);
          await renderNotes();
          showToast('Catatan berhasil dikembalikan', 'success');
          break;
      }
    } catch (error) {
      console.error(`Error in ${e.type}:`, error);
      showToast(`Gagal: ${error.message}`, 'error');
    } finally {
      if (targetButton) {
        targetButton.classList.remove('btn-loading');
        targetButton.disabled = false;
      }
      Utils.hideElement(loadingIndicator);
    }
  };
  // Helper functions
  function highlightNewNote(noteId) {
    setTimeout(() => {
      const newNoteElement = document.querySelector(`note-item[note*="${noteId}"]`);
      if (newNoteElement) {
        newNoteElement.style.animation = 'highlight 1s';
      }
    }, 100);
  }

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function createLoadingIndicator() {
    const el = document.createElement('div');
    el.className = 'loading';
    el.innerHTML = `
      <div class="spinner"></div>
      <span>Memuat catatan...</span>
    `;
    return el;
  }

  function createErrorMessage() {
    const el = document.createElement('div');
    el.className = 'error-message';
    el.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <span>Gagal memuat catatan. Silakan coba lagi.</span>
    `;
    el.style.display = 'none';
    return el;
  }

  function createEmptyMessage() {
    const el = document.createElement('p');
    el.className = 'empty-message';
    el.textContent = 'Tidak ada catatan';
    el.style.display = 'none';
    return el;
  }

  // Set up navigation
  const setupNavigation = () => {
    const navButtons = notesContainer.querySelectorAll('.nav-btn');
    navButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        currentView = btn.dataset.view;
        navButtons.forEach((b) => b.classList.toggle('active', b === btn));
        renderNotes();
      });
    });
  };

  // Set up form listeners
  const setupFormListeners = () => {
    const notesFormElement = document.querySelector('notes-form');
    if (!notesFormElement || !notesFormElement.shadowRoot) {
      console.error('Notes form or shadow root not found');
      return;
    }

    const form = notesFormElement.shadowRoot.querySelector('form');
    if (!form) {
      console.error('Form not found in shadow root');
      return;
    }

    const titleInput = form.querySelector('#note-title');
    const bodyInput = form.querySelector('#note-body');
    const titleError = form.querySelector('#title-error');
    const bodyError = form.querySelector('#body-error');
    const titleCount = form.querySelector('#title-count');
    const bodyCount = form.querySelector('#body-count');

    if (!titleInput || !bodyInput || !titleError || !bodyError || !titleCount || !bodyCount) {
      console.error('Some form elements not found');
      return;
    }

    const validateInput = (input, maxLength) => {
      const length = input.value.length;
      const isValid = length > 0 && length <= maxLength;
      const errorEl = input.id === 'note-title' ? titleError : bodyError;

      errorEl.style.display = isValid ? 'none' : 'block';
      input.classList.toggle('error', !isValid);

      if (input.id === 'note-title') {
        titleCount.textContent = `${length}/${maxLength}`;
      } else {
        bodyCount.textContent = `${length}/${maxLength}`;
      }

      return isValid;
    };

    titleInput.addEventListener('input', () => validateInput(titleInput, 15));
    bodyInput.addEventListener('input', () => validateInput(bodyInput, 250));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();

      const isTitleValid = validateInput(titleInput, 15);
      const isBodyValid = validateInput(bodyInput, 250);

      if (isTitleValid && isBodyValid) {
        notesForm.dispatchEvent(
          new CustomEvent('note-create', {
            detail: { title, body },
            bubbles: true,
            composed: true,
          })
        );
        form.reset();
        titleCount.textContent = '0/15';
        bodyCount.textContent = '0/250';
      }
    });
  };

  // Initialize
  setupNavigation();
  setupFormListeners();
  document.addEventListener('note-create', handleNoteAction);
  document.addEventListener('note-delete', handleNoteAction);
  document.addEventListener('note-archive', handleNoteAction);
  document.addEventListener('note-unarchive', handleNoteAction);

  renderNotes();

  const cleanup = () => {
    document.removeEventListener('note-create', handleNoteAction);
    document.removeEventListener('note-delete', handleNoteAction);
    document.removeEventListener('note-archive', handleNoteAction);
    document.removeEventListener('note-unarchive', handleNoteAction);
  };

  return { renderNotes, cleanup };
}

export default home;
