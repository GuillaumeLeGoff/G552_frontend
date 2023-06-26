import axios from "axios";
import Config from "../config/config.json";
import "../contexts/axiosConfig"

const URL_API = Config.SERVER_URL;

class ParamService {
  getByUserId(id) {
    const data = {};
    return axios.get(
      URL_API + "/params/user/" + id,
      JSON.stringify(data)
    );
  }

  create(param) {
    return axios.post(URL_API + "/params", param);
  }

  update(updates) {
    return axios.put(URL_API + "/params/updateEventAuto", updates);
  }

  delete(id) {
    return axios.delete(URL_API + "/params/" + id);
  }
}


const paramServiceInstance = new ParamService();

export default paramServiceInstance;
