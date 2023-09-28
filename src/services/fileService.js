import axios from "axios";
import Config from "../config/config.json";
import "../contexts/axiosConfig"


const URL_API = Config.SERVER_URL;
class FileService {
  // get files
  async get() {
    try {
      const res = await axios.get(`${URL_API}/files`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  // update file
  async update(file) {
    try {
      const res = await axios.put(`${URL_API}/file/${file._id}`, {
        fileName: file.fileName,
        format: file.format,
        path: file.path,
        duration: file.duration,
        name: file.name,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  // delete file
  async delete(file) {
    try {
      const res = await axios.delete(`${URL_API}/file/${file._id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  // post file
  async post(file) {
    try {
      const res = await axios.post(`${URL_API}/files`, file);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  // put file
  async put(file) {
    try {
      const res = await axios.put(`${URL_API}/file/${file._id}`, {
        duration: file.duration,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

const fileServiceInstance = new FileService();

export default fileServiceInstance;
