import axios from "axios";
import Config from "../config/config.json";

const URL_API = Config.SERVER_URL;

class ActiveSessionsService {
    
  deleteCurrentUser() {
    return axios.delete(URL_API + "/activeSessions");
  }

  
}
const activeSessionsServiceInstance = new ActiveSessionsService();

export default activeSessionsServiceInstance;
