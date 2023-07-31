import axios from "axios";
import Config from "../config/config.json";

const URL_API = Config.SERVER_URL;

class ScoringTennisService {
  create(score) {
    return axios.post(URL_API + "/tennis", score);
  }

  update(score) {
    return axios.put(URL_API + "/tennis/" + score.id, score);
  }

  updateMatchConfig(config) {
    return axios.put(URL_API + "/tennis/config" , config);
  }

  getById(id) {
    return axios.get(URL_API + "/tennis/" + id);
  }

  delete(id) {
    return axios.delete(URL_API + "/tennis/" + id);
  }

  getAll() {
    return axios.get(URL_API + "/tennis");
  }
}
const scoringTennisServiceInstance = new ScoringTennisService();

export default scoringTennisServiceInstance;
