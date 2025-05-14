//CSS untuk Component

export const headerStyles = new CSSStyleSheet();
headerStyles.replaceSync(`
  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 1px;
  }
`);

export const sidebarStyles = new CSSStyleSheet();
sidebarStyles.replaceSync(`
  :host {
    display: block;
    height: 100%;
    padding: 20px;
    background-color: #f8f9fa;
    border-right: 1px solid #e0e0e0;
  }

  .sidebar-title {
    font-size: 20px;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #102C57;
    font-weight: 600;
  }
  
  .sidebar-title svg {
    width: 20px;
    height: 20px;
    fill: #102C57;
  }

  .note-item {
    padding: 15px;
    margin-bottom: 15px;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border-left: 4px solid #FFB1B1;
  }

  .note-item:hover {
    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  }

  .note-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 5px;
    color: #333;
  }

  .recently-viewed {
    font-size: 12px;
    color: #777;
    font-family: 'Montserrat', sans-serif;
  }
`);

export const noteItemStyles = new CSSStyleSheet();
noteItemStyles.replaceSync(`
  :host {
    display: block;
    border-radius: 8px;
    background: white;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    margin-bottom: 15px;
    overflow: hidden;
    transition: all 0.3s ease;
    animation: fadeIn 0.3s ease-out;
  }
  
  :host(:hover) {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.15);
  }
  
  .note-header {
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;
    background-color: var(--note-header-bg, #FFB1B1);
    transition: background-color 0.3s ease;
  }
  
  .note-title {
    margin: 0;
    font-size: 16px;
    color: #333;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .note-date {
    font-size: 12px;
    color: #777;
    margin-top: 5px;
  }
  
  .note-content-container {
    max-height: 200px;
    overflow-y: auto;
    padding: 15px;
  }
  
  .note-content {
    color: #555;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
    margin: 0;
    font-size: 14px;
  }
  
  .note-actions {
    display: flex;
    padding: 10px 15px;
    border-top: 1px solid #f0f0f0;
    background: #f9f9f9;
  }
  
  .note-actions button {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  button:focus {
    outline: 2px solid #102C57;
    outline-offset: 2px;
  }
  
  .archive-btn {
    background-color: #e3f2fd;
    color: #1565c0;
    margin-right: 8px;
  }
  
  .archive-btn:hover {
    background-color: #bbdefb;
  }
  
  .unarchive-btn {
    background-color: #e8f5e9;
    color: #2e7d32;
    margin-right: 8px;
  }
  
  .unarchive-btn:hover {
    background-color: #c8e6c9;
  }
  
  .delete-btn {
    background-color: #ffebee;
    color: #d32f2f;
  }
  
  .delete-btn:hover {
    background-color: #ffcdd2;
  }
  
  .note-content-container::-webkit-scrollbar {
    width: 5px;
  }
  
  .note-content-container::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 3px;
  }
  
  .btn-loading {
    position: relative;
    color: transparent !important;
    pointer-events: none;
  }

  .btn-loading::after {
    content: "";
    position: absolute;
    left: calc(50% - 8px);
    top: calc(50% - 8px);
    width: 16px;
    height: 16px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #555;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {to { transform: rotate(360deg); }}
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`);

export const notesFormStyles = new CSSStyleSheet();
notesFormStyles.replaceSync(`
  :host {
    display: block;
    margin-bottom: 30px;
  }
  
  .notes-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    animation: fadeDown 0.5s ease-out;
  }
  
  .form-group {
    margin-bottom: 10px;
    animation: fadeDown 0.5s ease-out forwards;
    opacity: 0;
  }
  
  .form-group:nth-child(1) {
    animation-delay: 0.1s;
  }
  
  .form-group:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    transition: border-color 0.3s ease;
  }
  
  input {
    border-bottom: 2px solid #102C57;
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
    border-bottom: 2px solid #102C57;
  }
  
  input:focus, textarea:focus {
    outline: none;
    border-color: #102C57;
  }
  
  button {
    background-color: #102C57;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 10px;
    font-family: 'Montserrat', sans-serif;
    transition: all 0.3s ease;
    animation: fadeDown 0.5s ease-out 0.3s forwards;
    opacity: 0;
  }
  
  button:hover {
    background-color: rgb(6, 11, 19);
  }
  
  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .char-count {
    font-size: 12px;
    color: #777;
    text-align: right;
    margin-top: 2px;
  }
  
  .error-message {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 2px;
    display: none;
  }
  
  .error {
    border-color: #e74c3c !important;
  }
  
  button.btn-loading {
    color: transparent !important;
    pointer-events: none;
  }
  
  button.btn-loading::after {
    content: "";
    position: absolute;
    left: calc(50% - 10px);
    top: calc(50% - 10px);
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @keyframes fadeDown {
    from { 
      opacity: 0; 
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0); 
    }
  }
`);
