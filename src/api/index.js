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
  const response = await axios.post(ENDPOINTS.GUILD_TRACK(guildId), data);
  return response.data;
}

const guildTrackRecommended = async (guildId) => {
  const response = await axios.get(ENDPOINTS.GUILD_TRACK_RECOMMENDED(guildId));
  return response.data;
}

const guildPause = async (guildId) => {
  const response = await axios.post(ENDPOINTS.GUILD_PAUSE(guildId));
  return response.data;
}

const guildUnpause = async (guildId) => {
  const response = await axios.post(ENDPOINTS.GUILD_UNPAUSE(guildId));
  return response.data;
}

const guildNext = async (guildId) => {
  const response = await axios.post(ENDPOINTS.GUILD_NEXT(guildId));
  return response.data;
}

const guildPrevious = async (guildId) => {
  const response = await axios.post(ENDPOINTS.GUILD_PREVIOUS(guildId));
  return response.data;
}

const guildLoop = async (guildId) => {
  const response = await axios.post(ENDPOINTS.GUILD_LOOP(guildId));
  return response.data;
}

const guildUnloop = async (guildId) => {
  const response = await axios.post(ENDPOINTS.GUILD_UNLOOP(guildId));
  return response.data;
}

const guildShuffle = async (guildId) => {
  const response = await axios.post(ENDPOINTS.GUILD_SHUFFLE(guildId));
  return response.data;
}

const api = {
  musicSearch,
  guildTrackAdd,
  guildTrackRecommended,
  guildPause,
  guildUnpause,
  guildNext,
  guildPrevious,
  guildLoop,
  guildUnloop,
  guildShuffle,
}

export default api;
