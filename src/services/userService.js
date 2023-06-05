import axios from "axios";
import Config from "../config.json";
import "../contexts/axiosConfig"

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
  changePassword(oldPassword, newPassword,id) {
    return axios.put(
      URL_API + "users/"+id,
      { oldPassword, newPassword },
    );
  }
}

const userServiceInstance = new UserService();

export default userServiceInstance;