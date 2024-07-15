import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';
import fs from 'node:fs';
import util from 'node:util';
import path from 'node:path';
import { URL } from 'node:url';
import http from 'node:http';
import { AddressInfo } from 'node:net';
import {v4 as uuidv4} from 'uuid';
import WebSocket, { WebSocketServer } from 'ws';

const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

let clients: { [key: string]: WebSocket } = {};

let syncCommand = async (clientId: string, command: string) => {
  console.log(`Command ${command} sent to client ${clientId}`);
}

// Create an Express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server with noServer option
const wss = new WebSocketServer({ noServer: true });

// Handle the upgrade event to check for WebSocket connections
server.on('upgrade', (request, socket, head) => {
  const requestUrl = new URL(request.url!, `http://${request.headers.host}`);
  const pathname = requestUrl.pathname;

  if (pathname.startsWith('/websocket/')) {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

wss.on('connection', (ws: WebSocket, request: http.IncomingMessage) => {
  const requestUrl = new URL(request.url!, `http://${request.headers.host}`);
  const clientId = requestUrl.pathname.replace('/websocket/','');

  clients[clientId] = ws;

  console.log(`New client connected with clientId ${clientId}`);

  // Send a message to the client
  ws.send(`Welcome to the WebSocket with clientId ${clientId}`);

  // Handle incoming messages from the client
  ws.on('message', (message: WebSocket.RawData) => {
    console.log(`Received: ${message}`);
    ws.send(`You said: ${message}`);
  });

  // Handle connection close
  ws.on('close', () => {
    console.log(`Client disconnected  with clientId ${clientId}`);
    delete clients[clientId];
  });
});


app.use(express.json()) // for parsing application/json
app.use(cors());

app.get('/health', (req, resp) => {
  resp.send('OK');
});

app.get('/fuck', (req, resp) => {
  resp.send('you');
});

app.post('/command/:clientId', async (req, resp) => {
  let clientId = req.params.clientId;
  let command = req.body.command;

  if (clients[clientId]) {
    const ws = clients[clientId].send(command); 
  }

  resp.send(`Command ${command} sent to client ${clientId}`);
});


let staticRoot = path.join(__dirname, '../frontend/dist');
app.get('/', (req, resp) => resp.redirect('/ui/'));
app.use('/ui', express.static(staticRoot));


server.listen(process.env.PORT || 8080, async function () {
  let addressInfo = server.address() as AddressInfo;
  let host = addressInfo.address;
  let port = addressInfo.port;
  console.log('Listening at http://%s:%s', host, port);
});
