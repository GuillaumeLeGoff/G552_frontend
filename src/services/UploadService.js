import axios from "axios";
import PropTypes from "prop-types";
import Config from "../config.json";
import authService from "./authService";

const URL_API = Config.SERVER_URL;

class UploadService {
  async get() {
    const data = {};
    return axios.get(
      URL_API + "/medias/" + authService.getCurrentUser().user.id,
      JSON.stringify(data)
    );
  }

  async delete(file) {
    try {
      const response = await axios.delete(URL_API + "/medias/" + file.idBdd);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async upload(setLoading, file) {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        URL_API +
          "/medias/" +
          authService.getCurrentUser().user.username +
          "/" +
          authService.getCurrentUser().user.id,
        formData,
        {
          headers: {
            "content-type": `multipart/form-data;boundary=${formData._boundary}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }
}

UploadService.propTypes = {
  file: PropTypes.object.isRequired,
};

export default new UploadService();
