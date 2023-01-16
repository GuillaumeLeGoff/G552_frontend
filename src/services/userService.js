import axios from "axios";
import authHeader from "./authHeader";
import Config from "../config.json";

const URL_API = Config.SERVER_URL;

class UserService {
  getPublicContent() {
    return axios.get(URL_API + "all");
  }
  getUserBoard() {
    return axios.get(URL_API + "user");
  }
  getAdminBoard() {
    return axios.get(URL_API + "admin");
  }
  getSuperuserBoard() {
    return axios.get(URL_API + "superuser");
  }
}

export default new UserService();
