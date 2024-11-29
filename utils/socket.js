// utils/socket.js
import { BASE_URL } from "@/constants/configs";
import { io } from "socket.io-client";


const socket = io(BASE_URL, {
    transports: ["websocket"], // Use websocket transport
    reconnection: true, // Reconnect if connection is lost
});

export default socket;