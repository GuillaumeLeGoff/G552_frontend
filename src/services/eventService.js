import axios from "axios";
import PropTypes from "prop-types";
import Config from "../config.json";
import authService from "./authService";
import "../contexts/axiosConfig"

const URL_API = Config.SERVER_URL;

class EventService {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  static async create(name) {
    console.log(name);
    const currentUser = authService.getCurrentUser();
    const userId = currentUser?.user?.id;
    try {
      const res = await axios.post(URL_API + "/events", {
        name: name,
        userId: userId,
      });
      console.log(res);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  static async get() {
    const currentUser = authService.getCurrentUser();
    const userId = currentUser?.user?.id;
    try {
      const res = await axios.get(URL_API + "/events/user/" + userId);

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  static async getById(id) {
    const currentUser = authService.getCurrentUser();
    const userId = currentUser?.user?.id;
    const data = { userId: userId };
    try {
      const res = await axios.get(URL_API + "/events/" + id, { params: data });

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(id) {
    try {
      const res = await axios.delete(URL_API + "/events/" + id);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

export default EventService;
