import axios from "axios";
import Config from "../config/config.json";
import "../contexts/axiosConfig";

const URL_API = Config.SERVER_URL;

class ParamService {
  async getByUserId(id) {
    try {
      const response = await axios.get(`${URL_API}/params/user/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(param) {
    try {
      const response = await axios.post(`${URL_API}/params`, param);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(updates) {
    try {
      const response = await axios.put(`${URL_API}/params/updateEventAuto`, updates);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(`${URL_API}/params/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const paramServiceInstance = new ParamService();

export default paramServiceInstance;
