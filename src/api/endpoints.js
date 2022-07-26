import CONFIG from './config';

const ENDPOINTS = {
  MUSIC_SEARCH: (query) => `${CONFIG.BASE_URL}/music/search?query=${query}`,
  GUILD_TRACK_POST: (guildId) => `${CONFIG.BASE_URL}/guild/${guildId}/track`,
  GUILD_TRACK_RECOMMENDED_GET: (guildId) => `${CONFIG.BASE_URL}/guild/${guildId}/track/recommended`,
}

export default ENDPOINTS;
