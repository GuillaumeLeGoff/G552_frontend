import axios from "axios";
import Config from "../config/config.json";
import "../contexts/axiosConfig";
import authService from "./authService";

const URL_API = Config.SERVER_URL;

class ScoreService {
  // Obtenir tous les scores
  getByUserId(userId) {
    return axios.get(`${URL_API}/scores/${userId}`);
  }

  // Ajouter un score
  addScore(score) {
    return axios.post(`${URL_API}/scores`, score);
  }

  update(userId, score) {
    return axios.put(`${URL_API}/scores/${userId}`, score);
  }

  updateSettings(userId, settings) {
    return axios.put(`${URL_API}/scores/settings/${userId}`, settings);
  }

  // Mettre à jour un score spécifique par ID
  updateSpecificScore(scoreId, updatedScore) {
    return axios.put(`${URL_API}/scores/${scoreId}`, updatedScore);
  }

  // Supprimer un score spécifique par ID
  deleteScore(scoreId) {
    return axios.delete(`${URL_API}/scores/${scoreId}`);
  }

  // Mettre à jour le score en fonction des équipes et des fautes
  updateScore(team1, team2, fauteTeam1, fauteTeam2, nomTeam1, nomTeam2) {
    console.log(
      "Mise à jour du score",
      team1,
      team2,
      fauteTeam1,
      fauteTeam2,
      nomTeam1,
      nomTeam2
    );
    return axios.put(`${URL_API}/scores/1`, {
      team1,
      team2,
      fauteTeam1,
      fauteTeam2,
      nomTeam1,
      nomTeam2,
    });
  }

  // Mettre à jour le timer
  updateTimer(timer) {
    return axios.put(
      `${URL_API}/timer/${authService.getCurrentUser().user.id}`,
      {
        timer,
      }
    );
  }
}

const scoreServiceInstance = new ScoreService();
export default scoreServiceInstance;
