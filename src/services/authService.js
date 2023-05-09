import axios from "axios";
import Config from "../config.json";

const SERVER_URL = Config.SERVER_URL;
const SIGN_IN_URL = "/auth/signin";
const SIGN_UP_URL = "/auth/signup";
const USER_URL = "/user";

class AuthService {
  login = async (username, password, setLoading) => {
    try {
      setLoading(true);
      const response = await axios.post(`${SERVER_URL}${SIGN_IN_URL}`, {
        username,
        password,
      });
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload();
      }
      setLoading(false);
      return response.data;
    } catch (error) {
      console.log("Error during login:", error);
      setLoading(false);
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

  register = async (username, password, role, setLoading) => {
    try {
      setLoading(true);
      const roles = [role];
      const response = await axios.post(`${SERVER_URL}${SIGN_UP_URL}`, {
        username,
        password,
        roles,
      });
      setLoading(false);
      return response.data;
    } catch (error) {
      console.log("Error during registration:", error);
      setLoading(false);
    }
  };

  updateUser = async (_id, role, setLoading) => {
    try {
      setLoading(true);
      const roles = [role];
      console.log(_id);
      const response = await axios.put(`${SERVER_URL}${USER_URL}/${_id}`, {
        roles,
      });
      setLoading(false);
      return response.data;
    } catch (error) {
      console.log("Error during update:", error);
      setLoading(false);
    }
  };

  getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
}

export default new AuthService();
