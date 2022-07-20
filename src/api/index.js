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

const api = {
  musicSearch,
  guildTrackAdd,
}

export default api;
