// Import the ws library
import WebSocket, { WebSocketServer } from 'ws';

// Create a new WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });

// Listen for connection events
wss.on('connection', (ws: WebSocket) => {
  ws.on('error', (err) => {
    console.log(`Error: ${err}`);
  })
  
  console.log('New client connected');

  // Listen for messages from clients
  ws.on('message', (message: string) => {
    console.log(`Received: ${message}`);
    
    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Broadcast: ${message}`);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');