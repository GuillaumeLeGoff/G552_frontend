import axios from "axios";
import Config from "../config/config.json";
import "../contexts/axiosConfig";

const URL_API = Config.SERVER_URL;

class EventMediaService {
  async getAllByEvent(id) {
    try {
      const response = await axios.get(
        `${URL_API}/eventmedias/event/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllByMedia(id) {
    try {
      const response = await axios.get(
        `${URL_API}/eventmedias/media/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllByMedia(id) {
    try {
      const response = await axios.delete(
        `${URL_API}/eventmedias/media/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async create(eventMedia) {
    try {
      const response = await axios.post(
        `${URL_API}/eventmedias`, 
        eventMedia
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id, mediaToDelete) {
    try {
      const response = await axios.delete(
        `${URL_API}/eventmedias/${id}`, 
        { data: mediaToDelete }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(updates) {
    try {
      const response = await axios.put(
        `${URL_API}/eventmedias/update-position`, 
        updates
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateDuration({ eventId, mediaId, duration }) {
    try {
      const data = {
        eventId: eventId,
        mediaId: mediaId,
        duration: duration,
      };
      const response = await axios.put(
        `${URL_API}/eventmedias/update-duration`, 
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const eventMediaServiceInstance = new EventMediaService();

export default eventMediaServiceInstance;
