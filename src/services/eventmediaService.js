import axios from "axios";
import Config from "../config.json";

const URL_API = Config.SERVER_URL;

class EventMediaService {


    getAllByEvent(id) {
    const data = {};
    return axios.get(URL_API + "/eventmedias/event/" + id, JSON.stringify(data));
  }
}


export default new EventMediaService();
