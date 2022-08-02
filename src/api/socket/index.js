import ENDPOINTS from "./endpoints";
const { io } = require("socket.io-client");

const player = io(ENDPOINTS.PLAYER());
const queue = io(ENDPOINTS.QUEUE());

const socket = {
  player,
  queue,
}

export default socket;
