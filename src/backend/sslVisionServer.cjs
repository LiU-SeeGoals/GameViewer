const dgram = require('dgram');
const ws = require('ws');

const SSL_VISION_MULTICAST_ADDRESS = process.env.SSL_VISION_MULTICAST_ADDR;
const SSL_VISION_MULTICAST_PORT = process.env.SSL_VISION_MULTICAST_PORT;

const SIMULATOR_UDP_ADDRESS = process.env.SIM_ADDR;
const SIMULATOR_UDP_PORT = process.SIM_YELLOW_CONTROLLER_LISTEN_PORT;
const wsPort = 3000;

// UDP socket to listen to multicast packages
const udpSocket = dgram.createSocket('udp4');


// WebSocket server
const wss = new ws.WebSocketServer({port: wsPort, 'Access-Control-Allow-Origin': "*"});

wss.on('connection', ws => {
    console.log('Websocket client connected to SSLVisionServer.');

    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);
        udpSocket.send(message, SERVER_PORT, SERVER_IP, (err) => {
          if (err) {
              console.error("Error sending UDP message:", err);
          } else {
              console.log("Message sent to", SERVER_IP, "on port", SERVER_PORT);
          }
      });
    });
});


udpSocket.bind(SSL_VISION_MULTICAST_PORT, () => {
  udpSocket.addMembership(SSL_VISION_MULTICAST_ADDRESS);
});

udpSocket.on('message', (msg) => {
  // Process the message and send it to connected WebSocket clients
  // console.log(`Received multicast message: ${msg}`);

  // Broadcast the message to all connected WebSocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(msg);
    }
  });
});
