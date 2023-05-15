import axios from "axios";
import Config from "../config.json";
import "../contexts/axiosConfig";

const SERVER_URL = Config.SERVER_URL;
const SIGN_IN_URL = "/auth/signin";
const SIGN_UP_URL = "/auth/signup";
const USER_URL = "/users";
const CHANGE_PASSWORD_URL = "/users/changePassword";

class AuthService {
  login = async (username, password) => {
    try {
      const response = await axios.post(`${SERVER_URL}${SIGN_IN_URL}`, {
        username,
        password,
      });
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload();
      }

      return response.data;
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  logout = async () => {
    try {
      localStorage.removeItem("user");
      window.location.reload();
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  register = async (username, password, role) => {
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
  };

  updateUser = async (id, role) => {
    try {
      const roles = [role];
      console.log(id);
      const response = await axios.put(`${SERVER_URL}${USER_URL}/${id}`, {
        roles,
      });
      return response.data;
    } catch (error) {
      console.log("Error during update:", error);
    }
  };

  changePassword = async (newPassword) => {
    try {
      const user = this.getCurrentUser();
      console.log(user.user.id);
      if (user) {
        await axios.post(
          `${SERVER_URL}${CHANGE_PASSWORD_URL}/${user.user.id}`,
          { newPassword }
        );
        this.logout();
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.log("Error during password change:", error);
      throw error;
    }
  };

  getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
}

export default new AuthService();
