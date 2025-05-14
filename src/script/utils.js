export const Utils = {
  emptyElement(element) {
    element.innerHTML = '';
  },

  showElement(element) {
    element.style.display = 'block';
  },

  hideElement(element) {
    element.style.display = 'none';
  },

  formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  },
};
