import axios from "axios";
import Config from "../config.json";

const URL_API = Config.SERVER_URL;

class Eventservice {
  create(name) {
    return axios
      .post(URL_API + "/events", {
        name: name,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }
  get() {
    const data = {};
    return axios.get(URL_API + "/events", JSON.stringify(data));
  }

  getById(id) {
    const data = {};
    return axios.get(URL_API + "/events/" + id, JSON.stringify(data));
  }
}


export default new Eventservice();
