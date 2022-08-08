import CONFIG from './config';

const ENDPOINTS = {
  MUSIC_SEARCH: (query) => `${CONFIG.BASE_URL}/music/search?query=${query}`,
  GUILD_TRACK: (guildId) => `${CONFIG.BASE_URL}/guild/${guildId}/track`,
  GUILD_TRACK_DELETE: (guildId, position) => `${CONFIG.BASE_URL}/guild/${guildId}/track/${position}`,
  GUILD_TRACK_RECOMMENDED: (guildId, identifier) => `${CONFIG.BASE_URL}/guild/${guildId}/track/recommended?identifier=${identifier ? identifier : ''}`,
  GUILD_PAUSE: (guildId) => `${CONFIG.BASE_URL}/guild/${guildId}/pause`,
  GUILD_UNPAUSE: (guildId) => `${CONFIG.BASE_URL}/guild/${guildId}/unpause`,
  GUILD_NEXT: (guildId) => `${CONFIG.BASE_URL}/guild/${guildId}/next`,
  GUILD_PREVIOUS: (guildId) => `${CONFIG.BASE_URL}/guild/${guildId}/previous`,
  GUILD_LOOP: (guildId) => `${CONFIG.BASE_URL}/guild/${guildId}/loop`,
  GUILD_UNLOOP: (guildId) => `${CONFIG.BASE_URL}/guild/${guildId}/unloop`,
  GUILD_SHUFFLE: (guildId) => `${CONFIG.BASE_URL}/guild/${guildId}/shuffle`,
}

export default ENDPOINTS;
