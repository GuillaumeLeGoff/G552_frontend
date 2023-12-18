import fetchWithAuth  from '../utils/fetchWithAuth';
import AuthService from "./authService";


const URL_API = process.env.REACT_APP_API_URL;

class EventService {
  static async create(name) {
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser?.user?.id;
    try {
      const response = await fetchWithAuth(`${URL_API}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, userId }),
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  static async get() {
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser?.user?.id;
    try {
      const response = await fetchWithAuth(`${URL_API}/events/user/${userId}`);
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser?.user?.id;
    try {
      const response = await fetchWithAuth(`${URL_API}/events/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const response = await fetchWithAuth(`${URL_API}/events/${id}`, {
        method: 'DELETE',
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }
}

export default EventService;