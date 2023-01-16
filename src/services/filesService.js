import axios from "axios";
import Config from "../config.json";

const URL_API = Config.SERVER_URL;

class FilesService {
  getFiles() {
    const data = {};
    return axios.get(URL_API + "/files", JSON.stringify(data));
  }
}
export default new FilesService();
