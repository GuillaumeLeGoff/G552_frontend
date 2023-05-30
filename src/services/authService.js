import axios from "axios";
import { useState } from "react";

import Config from "../config.json";

const SERVER_URL = Config.SERVER_URL;
const SIGN_IN_URL = "/auth/signin";
const SIGN_UP_URL = "/auth/signup";
const USER_URL = "/users";
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
      console.log("Error during login:", error);
    }
  }

  async logout() {
    try {
      localStorage.removeItem("user");
      this.currentUser = null;
      window.location.reload();
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

  async updateUser(id, role) {
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
}

const authService = new AuthService();

export default authService;
