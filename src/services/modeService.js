import axios from "axios";
import Config from "../config/config.json";
import "../contexts/axiosConfig";

const URL_API = Config.SERVER_URL;

class ModeService {
  async setMode(mode) {
    try {
      const response = await axios.put(`${URL_API}/mode/1`, mode);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const modeServiceInstance = new ModeService();

export default modeServiceInstance;
