import axios from "axios";
import Config from "../config.json";
const URL_API = Config.SERVER_URL;
class UploadService {
  delete(file) {
    return axios
      .post(URL_API + "/delete", {
        fileName: file.fileName,
        format: file.format,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }
  upload(file) {
    let formData = new FormData();
    formData.append("file", file);
    console.log(file);
    return axios
      .post(URL_API + "/medias", formData, {
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
