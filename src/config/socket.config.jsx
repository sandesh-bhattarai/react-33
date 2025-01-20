import { io } from "socket.io-client";

let url = import.meta.env.VITE_SOCKET_URL;
const socket = io(url, {
  autoConnect: false,
});

export default socket;
