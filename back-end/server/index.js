const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io'); // Import Server from socket.io

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Create a new instance of Server

const port = process.env.PORT || 4000;

app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (data) => {
    console.log(data); // Log the received message data
    io.emit('message', data); // Broadcast the received message data to all clients
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});