import CONFIG from './config';

const ENDPOINTS = {
  PLAYER: () => `${CONFIG.BASE_URL}/`,
  QUEUE: () => `${CONFIG.BASE_URL}/`,
}

export default ENDPOINTS;
