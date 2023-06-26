import axios from "axios";
import Config from "../config/config.json";
import "../contexts/axiosConfig";
import authService from "./authService";
const URL_API = Config.SERVER_URL;

class ScoreService {
// Obtenir les scores
getScores() {
return axios.get(URL_API + "/scores");
}

// Mettre à jour le score
updateScore(team1, team2, fauteTeam1, fauteTeam2,nomTeam1,nomTeam2) {
console.log("Updating score", team1, team2, fauteTeam1, fauteTeam2,nomTeam1,nomTeam2);
return axios.put(
URL_API + "/scores/1" ,
{
team1: team1,
team2: team2,
fauteTeam1: fauteTeam1,
fauteTeam2: fauteTeam2,
nomTeam1: nomTeam1,
nomTeam2: nomTeam2
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

return axios.put(
URL_API + "/timer/" + authService.getCurrentUser().user.id,
{
timer: timer,
}
);
}
}

const scoreServiceInstance = new ScoreService();

export default scoreServiceInstance;