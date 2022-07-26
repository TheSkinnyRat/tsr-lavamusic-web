import ENDPOINTS from "./endpoints";
import axios from "axios";

const musicSearch = async (query) => {
  const response = await axios.get(ENDPOINTS.MUSIC_SEARCH(query));
  return response.data;
}

const guildTrackAdd = async (guildId, identifier) => {
  const data = {
    identifier: identifier,
  }
  const response = await axios.post(ENDPOINTS.GUILD_TRACK_POST(guildId), data);
  return response.data;
}

const guildTrackRecommended = async (guildId) => {
  const response = await axios.get(ENDPOINTS.GUILD_TRACK_RECOMMENDED_GET(guildId));
  return response.data;
}

const api = {
  musicSearch,
  guildTrackAdd,
  guildTrackRecommended,
}

export default api;
