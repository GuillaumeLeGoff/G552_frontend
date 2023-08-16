import axios from "axios";
import Config from "../config/config.json";

const URL_API = Config.SERVER_URL;

class scoringBadmintonService {
  create(score) {
    return axios.post(URL_API + "/Badminton", score);
  }

  update(score) {
    return axios.put(URL_API + "/Badminton/" + score.id, score);
  }

  updateMatchConfig(config) {
    return axios.put(URL_API + "/Badminton/config" , config);
  }

  getById(id) {
    return axios.get(URL_API + "/Badminton/" + id);
  }

  delete(id) {
    return axios.delete(URL_API + "/Badminton/" + id);
  }

  getAll() {
    return axios.get(URL_API + "/Badminton");
  }
}
const scoringBadmintonServiceInstance = new scoringBadmintonService();

export default scoringBadmintonServiceInstance;
