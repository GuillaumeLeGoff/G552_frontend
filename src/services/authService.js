import axios from "axios";

import Config from "../config/config.json";

const SERVER_URL = Config.SERVER_URL;
const SIGN_IN_URL = "/auth/signin";
const SIGN_UP_URL = "/auth/signup";
const UPDATE_FIRST_LOGIN = "/auth/updateFirstLogin";
const CHANGE_PASSWORD_URL = "/auth/modifyPassword";

class AuthService {
  constructor() {
    this.currentUser = null;
  }

  async login(username, password) {
    try {
      const response = await axios.post(`${SERVER_URL}${SIGN_IN_URL}`, {
        username,
        password,
      });

      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        this.currentUser = response.data;
        window.location.reload();
      }

      return response.data;
    } catch (error) {
      // Si une erreur se produit, vérifiez si c'est parce qu'un utilisateur est déjà connecté
      console.log("Error during login:", error.response.data.error);
      if (
        error.response &&
        error.response.data.error === "Un autre utilisateur est déjà connecté"
      ) {
        console.log("User already connected");
        // Si c'est le cas, retournez une réponse personnalisée
        return { userConected: true };
      }
    }
  }

  async logout() {
    console.log("Logout");
    try {
      const response = await axios.put(
        `${SERVER_URL}/activeSessions/logout`,
        {}
      );

      localStorage.removeItem("user");
      this.currentUser = null;
      window.location.reload();

      return response.data;
    } catch (error) {
      console.log("Error during logout:", error);
    }
  }

  async register(username, password, role) {
    try {
      const roles = [role];
      const response = await axios.post(`${SERVER_URL}${SIGN_UP_URL}`, {
        username,
        password,
        roles,
      });

      return response.data;
    } catch (error) {
      console.log("Error during registration:", error);
    }
  }

  updateAccessToken(newToken) {
    const user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = newToken;
    localStorage.setItem("user", JSON.stringify(user));
  }

  async changePassword(newPassword) {
    try {
      const user = this.getCurrentUser();

      if (user) {
        await axios.post(
          `${SERVER_URL}${CHANGE_PASSWORD_URL}/${user.user.id}`,
          { newPassword }
        );
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.log("Error during password change:", error.response.data.message);

      throw error;
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  async updateFirstLogin(id) {
    try {
      const response = await axios.post(
        `${SERVER_URL}${UPDATE_FIRST_LOGIN}/${id}`
      );

      return response.data;
    } catch (error) {
      console.log("Error during firstLogin:", error);
    }
  }
}

const authService = new AuthService();

export default authService;
