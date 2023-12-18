import fetchWithAuth from '../utils/fetchWithAuth';

const URL_API = process.env.REACT_APP_API_URL;

class UserService {
  async getPublicContent() {
    try {
      const response = await fetchWithAuth(URL_API + "all");
      return await response.json();
    } catch (erreur) {
      console.error(erreur);
      throw erreur;
    }
  }

  async getUserBoard() {
    try {
      const response = await fetchWithAuth(URL_API + "user");
      return await response.json();
    } catch (erreur) {
      console.error(erreur);
      throw erreur;
    }
  }

  async getAdminBoard() {
    try {
      const response = await fetchWithAuth(URL_API + "admin");
      return await response.json();
    } catch (erreur) {
      console.error(erreur);
      throw erreur;
    }
  }

  async getSuperuserBoard() {
    try {
      const response = await fetchWithAuth(URL_API + "superuser");
      return await response.json();
    } catch (erreur) {
      console.error(erreur);
      throw erreur;
    }
  }

  async changePassword(oldPassword, newPassword, id) {
    try {
      const response = await fetchWithAuth(URL_API + "users/" + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      return await response.json();
    } catch (erreur) {
      console.error(erreur);
      throw erreur;
    }
  }
}

const userServiceInstance = new UserService();

export default userServiceInstance;