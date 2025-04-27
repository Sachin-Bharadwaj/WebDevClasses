"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8082 });
let allSockets = [];
// calback function for every new connection
wss.on("connection", (socket) => {
    // handler for incoming message
    socket.on("message", (message) => {
        // convert the message of type string back to JSON object
        const parsedMessage = JSON.parse(message.toString());
        // check if user wants to join a room
        if (parsedMessage.type === "join") {
            allSockets.push({
                socket: socket,
                roomId: parsedMessage.payload.roomId
            });
        }
        // check if user wants to chat
        if (parsedMessage.type === "chat") {
            const user = allSockets.find((user) => user.socket === socket);
            const currentUserRoom = user ? user.roomId : null;
            // send message to all users in the same room
            allSockets.forEach((user) => {
                if (user.roomId === currentUserRoom) {
                    user.socket.send(JSON.stringify({
                        type: "chat",
                        payload: {
                            message: parsedMessage.payload.message
                        }
                    }));
                }
            });
        }
    });
    // handler for closing sockets
    socket.on("close", () => {
        allSockets = allSockets.filter((user) => user.socket !== socket);
    });
});
