import fetchWithAuth  from '../utils/fetchWithAuth';
import authService from "./authService";

const URL_API = process.env.REACT_APP_API_URL; // Utilisez l'URL de l'API à partir de la variable d'environnement


class MacroService {
  async create(macro) {
    try {
      const response = await fetchWithAuth(`${URL_API}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(macro)
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async update(macro) {
    try {
      const response = await fetchWithAuth(`${URL_API}/macros/${macro.button_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(macro)
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async getById() {
    try {
      const userId = authService.getCurrentUser().user.id;
      const response = await fetchWithAuth(`${URL_API}/macros/user/${userId}`);
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await fetchWithAuth(`${URL_API}/${id}`, {
        method: 'DELETE'
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async getByUserId(userId) {
    try {
      const response = await fetchWithAuth(`${URL_API}/user/${userId}`);
      return response.json();
    } catch (error) {
      throw error;
    }
  }
}

const macroServiceInstance = new MacroService();

export default macroServiceInstance;