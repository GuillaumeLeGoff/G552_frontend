import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Config from "../config.json";
import authService from "./authService";
import { useSnackbar } from "../contexts/SnackbarContext"; // Veuillez inclure le bon chemin vers useSnackbar
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
 
   async function upload(setLoading, file) {
    console.log(file);
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
 
       openSnackbar("Le fichier a été téléchargé avec succès", "success");
 
       return response.data;
     } catch (error) {
       console.log(error);
       openSnackbar("Une erreur s'est produite lors du téléchargement du fichier", "error");
       throw error;
     } finally {
       setLoading(false);
     }
   }
 
   return { get, deleteFile, upload };
 }
 
 export default UploadService;