import fetchWithAuth  from '../utils/fetchWithAuth'; // Assurez-vous du chemin correct

const URL_API = process.env.REACT_APP_API_URL;

class EventMediaService {
  async getAllByEvent(id) {
    const response = await fetchWithAuth(`${URL_API}/eventmedias/event/${id}`);
    return response.json();
  }

  async getAllByMedia(id) {
    const response = await fetchWithAuth(`${URL_API}/eventmedias/media/${id}`);
    return response.json();
  }

  async deleteAllByMedia(id) {
    const response = await fetchWithAuth(`${URL_API}/eventmedias/media/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }

  async create(eventMedia) {
    const response = await fetchWithAuth(`${URL_API}/eventmedias`, {
      method: 'POST',
      body: JSON.stringify(eventMedia),
    });
    return response.json();
  }

  async delete(id, mediaToDelete) {
    const response = await fetchWithAuth(`${URL_API}/eventmedias/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(mediaToDelete),
    });
    return response.json();
  }

  async update(updates) {
    const response = await fetchWithAuth(`${URL_API}/eventmedias/update-position`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.json();
  }

  async updateDuration({ eventId, mediaId, duration }) {
    const data = {
      eventId,
      mediaId,
      duration,
    };
    const response = await fetchWithAuth(`${URL_API}/eventmedias/update-duration`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export default EventMediaService;
