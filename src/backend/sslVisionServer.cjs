const dgram = require('dgram');
const ws = require('ws');

const multicastAddress = '224.5.23.2';
const multicastPort = 10020;
const wsPort = 3000;

// WebSocket server
const wss = new ws.WebSocketServer({port: wsPort, 'Access-Control-Allow-Origin': "*"});

wss.on('connection', ws => {
    console.log('WebSocket client connected.');

    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);
    });
});

// UDP socket to listen to multicast packages
const udpSocket = dgram.createSocket('udp4');

udpSocket.bind(multicastPort, () => {
  udpSocket.addMembership(multicastAddress);
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
