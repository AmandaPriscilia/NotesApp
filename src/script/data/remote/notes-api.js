const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async _fetchWithLoading(endpoint, options = {}) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message || `Error ${response.status}`);
      }

      return responseJson;
    } catch (error) {
      console.error(`API Error at ${endpoint}:`, error);
      throw error;
    } finally {
    }
  }

  static async getNotes() {
    const response = await this._fetchWithLoading("/notes");
    return response.data;
  }

  static async getArchivedNotes() {
    const response = await this._fetchWithLoading("/notes/archived");
    return response.data;
  }

  static async getSingleNote(id) {
    const response = await this._fetchWithLoading(`/notes/${id}`);
    return response.data;
  }

  static async createNote(title, body) {
    const response = await this._fetchWithLoading("/notes", {
      method: "POST",
      body: JSON.stringify({ title, body }),
    });

    return response;
  }

  static async deleteNote(id) {
    const response = await this._fetchWithLoading(`/notes/${id}`, {
      method: "DELETE",
    });

    return response;
  }

  static async archiveNote(id) {
    const response = await this._fetchWithLoading(`/notes/${id}/archive`, {
      method: "POST",
    });

    return response;
  }

  static async unarchiveNote(id) {
    const response = await this._fetchWithLoading(`/notes/${id}/unarchive`, {
      method: "POST",
    });

    return response;
  }
}

export default NotesApi;
