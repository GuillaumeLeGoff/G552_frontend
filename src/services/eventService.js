import axios from "axios";
import PropTypes from "prop-types";
import Config from "../config/config.json";
import authService from "./authService";
import "../contexts/axiosConfig"

const URL_API = Config.SERVER_URL;

class EventService {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  static async create(name) {
    const currentUser = authService.getCurrentUser();
    const userId = currentUser?.user?.id;
    try {
      const res = await axios.post(`${URL_API}/events`, {
        name: name,
        userId: userId,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async get() {
    const currentUser = authService.getCurrentUser();
    const userId = currentUser?.user?.id;
    try {
      const res = await axios.get(`${URL_API}/events/user/${userId}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    const currentUser = authService.getCurrentUser();
    const userId = currentUser?.user?.id;
    try {
      const res = await axios.get(`${URL_API}/events/${id}`, { params: { userId } });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const res = await axios.delete(`${URL_API}/events/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default EventService;
