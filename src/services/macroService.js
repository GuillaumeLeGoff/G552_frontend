import axios from "axios";
import Config from "../config.json";

const URL_API = Config.SERVER_URL;
class MacroService {
  create(macro) {
    return axios.post(URL_API , macro);
  }

  update(macro) {
    return axios.put(`${URL_API }/${macro.id}`, macro);
  }

  getById(id) {
    return axios.get(`${URL_API }/${id}`);
  }

  delete(id) {
    return axios.delete(`${URL_API }/${id}`);
  }

  getByUserId(userId) {
    return axios.get(`${URL_API }/user/${userId}`);
  }
}

export default new MacroService();
