import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8081 });

// event handler
wss.on("connection", function(socket) {
    console.log("User connected");

    // server pushing message on socket
    /* setInterval(() => {
        socket.send("Current price of Solana is: " + Math.random()*100);
    }, 5 * 1000); */

    // server receiving message from socket
    /* socket.on("message", (e) => {
        console.log(e.toString());
    }) */
    
    socket.on("message", (e) => {
        if (e.toString() === "ping") {
            socket.send("pong");
        }
    })

})