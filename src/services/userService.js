import axios from "axios";
import Config from "../config/config.json";
import "../contexts/axiosConfig"

const URL_API = Config.SERVER_URL;

class UserService {
  async getPublicContent() {
    try {
      return await axios.get(URL_API + "all");
    } catch (erreur) {
      console.error(erreur);
      throw erreur;
    }
  }

  async getUserBoard() {
    try {
      return await axios.get(URL_API + "user");
    } catch (erreur) {
      console.error(erreur);
      throw erreur;
    }
  }

  async getAdminBoard() {
    try {
      return await axios.get(URL_API + "admin");
    } catch (erreur) {
      console.error(erreur);
      throw erreur;
    }
  }

  async getSuperuserBoard() {
    try {
      return await axios.get(URL_API + "superuser");
    } catch (erreur) {
      console.error(erreur);
      throw erreur;
    }
  }

  async changePassword(oldPassword, newPassword, id) {
    try {
      return await axios.put(
        URL_API + "users/" + id,
        { oldPassword, newPassword },
      );
    } catch (erreur) {
      console.error(erreur);
      throw erreur;
    }
  }
}

const userServiceInstance = new UserService();

export default userServiceInstance;
