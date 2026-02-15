import { io } from "socket.io-client";
console.log("BAKCEND",import.meta.env.VITE_BACKEND)
export const socket = io(import.meta.env.VITE_BACKEND, {
    autoConnect: false,
    transports: ["websocket"],
    extraHeaders: {
        "ngrok-skip-browser-warning":"true"
    }
});