import axios from "axios";
import Config from "../config.json";

const URL_API = Config.SERVER_URL;

class Eventservice {
  post(name) {
    return axios.post(URL_API + "/auth/signin", {
      name: name,
    });
  }
}

export default new Eventservice();
