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
    console.log(file.file);
    return axios
      .post(URL_API + "/upload", { 
        fileName:file.name,
        format:file.format,
        user:file._user,
        path:file.path,
        file:file.file,
      }, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .catch((error) => {
        console.log('error:');
        console.log(error);
      });
  }
}

export default new UploadService();
