import axios from "axios";
import Config from "../config/config.json";
import authService from "./authService";
import "../contexts/axiosConfig";
const URL_API = Config.SERVER_URL;
class ModeService {
  setMode(mode) {
    return axios.put(URL_API + "/mode/" + 1 , mode);
  }
}
const modeServiceInstance = new ModeService();

export default modeServiceInstance;
