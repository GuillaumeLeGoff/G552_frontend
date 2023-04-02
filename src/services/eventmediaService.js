import axios from "axios";
import Config from "../config.json";

const URL_API = Config.SERVER_URL;

class EventMediaService {
  getAllByEvent(id) {
    const data = {};
    return axios.get(
      URL_API + "/eventmedias/event/" + id,
      JSON.stringify(data)
    );
  }
  getAllByMedia(id) {
    const data = {};
    return axios.get(
      URL_API + "/eventmedias/media/" + id,
      JSON.stringify(data)
    );
  }
  deleteAllByMedia(id) {
    const data = {};
    return axios.delete(
      URL_API + "/eventmedias/media/" + id,
      JSON.stringify(data)
    );
  }
  create(eventMedia) {
    return axios.post(URL_API + "/eventmedias", eventMedia);
  }
  delete(id) {
    console.log(id);
    return axios.delete(URL_API + "/eventmedias/" + id);
  }

  updateMediaPositions(eventId, mediaPositions) {
    return axios.put(URL_API + `/eventmedias/${eventId}/media-positions`, {
      mediaPositions,
    });
  }
}

export default new EventMediaService();
