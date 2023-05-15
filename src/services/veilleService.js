import axios from "axios";
import Config from "../config.json";
import "../contexts/axiosConfig"

const URL_API = Config.SERVER_URL;

class VeilleService {
  getByUserId(id) {
    const data = {};
    return axios.get(
      URL_API + "/veilles/" + id,
      JSON.stringify(data)
    );
  }

  create(veille) {
    return axios.post(URL_API + "/veilles", veille);
  }

  update(updates) {
    return axios.put(URL_API + "/veilles", updates);
  }

  delete(id) {
    return axios.delete(URL_API + "/veilles/" + id);
  }
}

export default new VeilleService();