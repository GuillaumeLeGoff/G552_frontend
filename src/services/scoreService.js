import axios from "axios";
import Config from "../config.json";
import "../contexts/axiosConfig";
import authService from "./authService";
const URL_API = Config.SERVER_URL;

class ScoreService {
  // Obtenir les scores
  getScores() {
    return axios.get(URL_API + "/scores");
  }

  // Mettre à jour le score
  updateScore(team1, team2) {
    console.log("Updating score", team1, team2);
    return axios.put(
      URL_API + "/scores/" + authService.getCurrentUser().user.id,
      {
        team1: team1,
        team2: team2,
      }
    );
  }

  // Supprimer un score
  deleteScore(scoreId) {
    return axios.delete(URL_API + "/scores/" + scoreId);
  }

  // Ajouter un score
  addScore(score) {
    return axios.post(URL_API + "/scores", score);
  }

  // Mettre à jour un score spécifique
  updateSpecificScore(scoreId, updatedScore) {
    return axios.put(URL_API + "/scores/" + scoreId, updatedScore);
  }

  // Mettre à jour le timer
  updateTimer(timer) {
    console.log("Updating timer", timer);
    return axios.put(
      URL_API + "/timer/" + authService.getCurrentUser().user.id,
      {
        timer: timer,
      }
    );
  }
}

export default new ScoreService();
