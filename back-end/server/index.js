// server.js
// const cors = require('cors');
const express = require('express');
const http = require('http');
const ChatEngine = require('chat-engine');
const admin = require('firebase-admin');
const { ExpressPeerServer } = require('peer');
const socketIO = require('socket.io');
// const bodyParser = require('body-parser'); // Add this line
// const ProductRoutes = require('../Routes/ProductsRoutes'); // Add this line
// const Postes = require('../Routes/Postes')
// const userRoutes = require('../Routes/user');
const cors = require ('cors')
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;
const { Server } = require('socket.io');

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// server.listen(3000, () => {
//   console.log('Socket.io server is running on port 3000');
// });

// const serviceAccount = require('../');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const db = admin.firestore();

// const chatEngine = ChatEngine.create({
//   publishKey: '',
//   subscribeKey: ''
// });

// // Remove the incorrect call to connect() method

// app.get('/token/:username', async (req, res) => {
//   const { username } = req.params;

//   const tokenSnapshot = await db.collection('tokens').doc(username).get();
//   const tokenData = tokenSnapshot.data();

//   if (!tokenData) {
//     return res.status(404).send('User not found');
//   }

//   res.send({ token: tokenData.token });
// });

// // Instead, handle authentication after ChatEngine is ready
// chatEngine.on('$.ready', () => {
//   console.log('ChatEngine is ready');

//   // Connect user after ChatEngine is ready
//   const me = chatEngine.connect('username', {
//     signedOnTime: Date.now(),
//     authKey: 'auth-key'
//   });

//   me.on('$.online', () => {
//     console.log('You are online');
//   });

//   me.on('$.offline', () => {
//     console.log('You are offline');
//   });

//   chatEngine.global.on('voice-chat-offer', (payload) => {
//     // Broadcast voice chat offer
//     chatEngine.global.emit('voice-chat-offer', payload);
//   });

//   chatEngine.global.on('voice-chat-answer', (payload) => {
//     // Broadcast voice chat answer
//     chatEngine.global.emit('voice-chat-answer', payload);
//   });
// });

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
