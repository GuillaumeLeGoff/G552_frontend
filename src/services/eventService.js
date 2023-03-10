import axios from "axios";
import Config from "../config.json";
import authService from "./authService";

const URL_API = Config.SERVER_URL;

class Eventservice {
  create(name) {
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
   
    return axios.get(URL_API + "/events/"+  authService.getCurrentUser().user.id );
  }

  getById(id) {
    const data = {
      userId: authService.getCurrentUser().user.id
    };
    return axios.get(URL_API + "/events/" + id, { params: data });
  }
  
  delete(id) {
    return axios.delete(URL_API + "/events/" + id);
  }
}


export default new Eventservice();
