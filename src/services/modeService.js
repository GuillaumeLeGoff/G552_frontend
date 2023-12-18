import fetchWithAuth  from '../utils/fetchWithAuth';

class ModeService {
  async setMode(mode) {
    const URL_API = process.env.REACT_APP_API_URL; // Assurez-vous que REACT_APP_API_URL est défini dans vos variables d'environnement

    try {
      const response = await fetchWithAuth(`${URL_API}/mode/1`, {
        method: 'PUT',
        body: JSON.stringify(mode),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const modeServiceInstance = new ModeService();

export default modeServiceInstance;