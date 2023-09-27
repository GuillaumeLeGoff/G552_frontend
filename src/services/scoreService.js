import axios from "axios";
import Config from "../config/config.json";
import "../contexts/axiosConfig";
import authService from "./authService";

const URL_API = Config.SERVER_URL;
const userId = authService.getCurrentUser() ? authService.getCurrentUser().user.id : null;

class ScoreService {
  // Obtenir tous les scores
  async getByUserId() {
    try {
      return await axios.get(`${URL_API}/scores/${userId}`);
    } catch (erreur) {
      console.error("Erreur lors de la récupération des scores:", erreur);
      throw erreur;
    }
  }

  // Ajouter un score
  async addScore(score) {
    try {
      return await axios.post(`${URL_API}/scores`, score);
    } catch (erreur) {
      console.error("Erreur lors de l'ajout du score:", erreur);
      throw erreur;
    }
  }

  async update(score) {
    try {
      return await axios.put(`${URL_API}/scores/${userId}`, score);
    } catch (erreur) {
      console.error("Erreur lors de la mise à jour des scores:", erreur);
      throw erreur;
    }
  }

  async updateSettings(settings) {
    try {
      return await axios.put(`${URL_API}/scores/settings/${userId}`, settings);
    } catch (erreur) {
      console.error("Erreur lors de la mise à jour des paramètres:", erreur);
      throw erreur;
    }
  }

  async updateSpecificScore(scoreId, updatedScore) {
    try {
      return await axios.put(`${URL_API}/scores/${scoreId}`, updatedScore);
    } catch (erreur) {
      console.error("Erreur lors de la mise à jour d'un score spécifique:", erreur);
      throw erreur;
    }
  }

  async deleteScore(scoreId) {
    try {
      return await axios.delete(`${URL_API}/scores/${scoreId}`);
    } catch (erreur) {
      console.error("Erreur lors de la suppression d'un score:", erreur);
      throw erreur;
    }
  }

  async updateScore(team1, team2, fauteTeam1, fauteTeam2, nomTeam1, nomTeam2) {
    try {
      return await axios.put(`${URL_API}/scores/1`, {
        team1,
        team2,
        fauteTeam1,
        fauteTeam2,
        nomTeam1,
        nomTeam2,
      });
    } catch (erreur) {
      console.error("Erreur lors de la mise à jour du score:", erreur);
      throw erreur;
    }
  }

  async updateTimer(timer) {
    try {
      return await axios.put(`${URL_API}/timer/${userId}`, { timer });
    } catch (erreur) {
      console.error("Erreur lors de la mise à jour du timer:", erreur);
      throw erreur;
    }
  }
}

const scoreServiceInstance = new ScoreService();
export default scoreServiceInstance;
