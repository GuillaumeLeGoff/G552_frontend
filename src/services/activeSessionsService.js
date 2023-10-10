import Config from "../config/config.json";

const URL_API = Config.SERVER_URL;

class ActiveSessionsService {
  async deleteCurrentUser() {
    console.log("Logout");
    try {
      const response = await fetch(`${URL_API}/activeSessions/logout`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la déconnexion");
      }

      const message = await response.json();
      console.log("message", message);
      
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API:", error);
    }
  }
}

const activeSessionsServiceInstance = new ActiveSessionsService();

export default activeSessionsServiceInstance;
