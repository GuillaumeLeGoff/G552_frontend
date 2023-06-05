import axios from "axios";
import Config from "../config.json";
import "../contexts/axiosConfig"

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
    return axios.delete(
      URL_API + "/eventmedias/media/" + id
    );
  }
  create(eventMedia) {
    return axios.post(URL_API + "/eventmedias", eventMedia);
  }
  delete(id,mediaToDelete) {
    return axios.delete(URL_API + "/eventmedias/"+id , { data: mediaToDelete });
  }

  update(updates) {
    return axios.put(URL_API + "/eventmedias/update-position", updates);
  }
  updateDuration({ eventId, mediaId, duration }) {
    const data = {
      eventId: eventId,
      mediaId: mediaId,
      duration: duration,
    };
    return axios.put(URL_API + "/eventmedias/update-duration", data);
  }

}
const eventMediaServiceInstance = new EventMediaService();

export default eventMediaServiceInstance;
