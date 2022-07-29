import ENDPOINTS from "./endpoints";
const { io } = require("socket.io-client");

const player = io(ENDPOINTS.PLAYER());

const socket = {
  player,
}

export default socket;
