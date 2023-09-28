import axios from "axios";
import Config from "../config/config.json";

const URL_API = Config.SERVER_URL;

class ActiveSessionsService {
  deleteCurrentUser() {
    console.log("Logout");
    const message = axios.put(`${URL_API}/activeSessions/logout`);
    console.log("message", message);
  }
}
const activeSessionsServiceInstance = new ActiveSessionsService();

export default activeSessionsServiceInstance;
