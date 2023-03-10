import axios from "axios";
import Config from "../config.json";
import authService from "./authService";
const URL_API = Config.SERVER_URL;
class UploadService {
  get() {
    const data = {};
    return axios.get(URL_API + "/medias/" + authService.getCurrentUser().user.username, JSON.stringify(data));
  }

  delete(file) {
    console.log('delete');
    return axios.delete(URL_API + "/medias/" + file.idBdd).catch((error) => {
      console.log("error:");
      console.log(error);
    });
  }
  upload(file) {
    let formData = new FormData();
    formData.append("file", file);
    return axios
      .post(URL_API + "/medias/" + authService.getCurrentUser().user.username , formData, {
        headers: {
          "content-type": `multipart/form-data;boundary=${formData._boundary}`,
        },
      })
      .catch((error) => {
        console.log("error:");
        console.log(error);
      });
  }
}

export default new UploadService();
