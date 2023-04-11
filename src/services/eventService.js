import axios from "axios";
import Config from "../config.json";
import authService from "./authService";

const URL_API = Config.SERVER_URL;

class Eventservice {
  create(name) {
    console.log(name);
    return axios
      .post(URL_API + "/events", {
        name: name,
        userId: authService.getCurrentUser().user.id
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }
  get() {
   
    return axios.get(URL_API + "/events/user/"+  authService.getCurrentUser().user.id );
  }

  getById(id) {
    const data = {
      userId: authService.getCurrentUser().id
    };
    return axios.get(URL_API + "/events/" + id, { params: data });
  }
  
  delete(id) {
    return axios.delete(URL_API + "/events/" + id);
  }
}


export default new Eventservice();
