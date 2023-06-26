import axios from "axios";
import Config from "../config/config.json";
import authService from "./authService";
import { useSnackbar } from "../contexts/SnackbarContext";
import "../contexts/axiosConfig"; // Ce module n'est pas utilisé, vous pouvez le supprimer

const URL_API = Config.SERVER_URL;

function UploadService() {
  const { openSnackbar } = useSnackbar();

  async function get() {
    const data = {};
    return axios.get(
      URL_API + "/medias/" + authService.getCurrentUser().user.id,
      JSON.stringify(data)
    );
  }

  async function deleteFile(file) {
    try {
      openSnackbar("Le fichier a été suprimer avec succès", "success");
      const response = await axios.delete(URL_API + "/medias/" + file.idBdd);

      return response.data;
    } catch (error) {
      console.log(error);
      openSnackbar("Le fichier n'a pas pue être suprimer", "error");
      throw error;
    }
  }

  async function upload(setLoading, file , setprogress) {
    console.log(file);

  if (file.size < 1073741824) {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", file);
  
      const config = {
        onUploadProgress: function(progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log("Progression de l'upload : " + percentCompleted + "%");
          setprogress(percentCompleted);
        },
        headers: {
          "content-type": "multipart/form-data",
        },
      };
  
      const response = await axios.post(
        URL_API +
          "/medias/" +
          authService.getCurrentUser().user.username +
          "/" +
          authService.getCurrentUser().user.id,
        formData,
        config
      );
  
      openSnackbar("Le fichier a été téléchargé avec succès", "success");
  
      const statut = response.status; // Récupération du statut de la requête
      console.log(response);
      return {
        data: response.data,
        statut: statut, // Ajout du statut dans le résultat retourné
      };
    } catch (error) {
      console.log(error);
      openSnackbar(
        "Une erreur s'est produite lors du téléchargement du fichier",
        "error"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  }else{openSnackbar(
    "Le fichier est trop volumineux (1 GO max)","error"
  );}

  
}

  
  return { get, deleteFile, upload };
}

export default UploadService;
