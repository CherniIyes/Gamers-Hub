// server.js
const cors = require('cors');
const express = require('express');
const http = require('http');
const ChatEngine = require('chat-engine');
const admin = require('firebase-admin');
const { ExpressPeerServer } = require('peer');
const bodyParser = require('body-parser'); // Add this line
const ProductRoutes = require('../Routes/ProductsRoutes'); // Add this line
const Postes = require('../Routes/Postes')
const userRoutes = require('../Routes/user');
const cors =require("cors");


const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;

const peerServer = ExpressPeerServer(server, {
  debug: true
});
app.use(cors());app.use(cors())
app.use('/peerjs', peerServer);
app.use(bodyParser.json()); // Add this line
app.use('/products', ProductRoutes); // Add this line
app.use("/postes", Postes)
app.use('/users', userRoutes)



app.use('/peerjs', peerServer);

const serviceAccount = require('./gamershubtn-d9e43-firebase-adminsdk-be9cu-7da513987d.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const chatEngine = ChatEngine.create({
  publishKey: '44bafdc2-0343-4c57-b416-b7b38d470b20',
  subscribeKey: '6284f0d3-eeb4-4a22-9a8a-dfdf36118f9f'
});


app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  
  try {
    const response = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "e72422c1-d3c4-4a1f-bcd8-8b099bdc689d" } }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {

    if (error.response) {
      // If there's a response, extract the status code and response data
      const { status, data } = error.response;
      return res.status(status).json(data);
    } else {
      // If there's no response, handle the error as a generic server error
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
// Remove the incorrect call to connect() method

app.get('/token/:username', async (req, res) => {
  const { username } = req.params;

  const tokenSnapshot = await db.collection('tokens').doc(username).get();
  const tokenData = tokenSnapshot.data();

  if (!tokenData) {
    return res.status(404).send('User not found');
  }

  res.send({ token: tokenData.token });
});

// Instead, handle authentication after ChatEngine is ready
chatEngine.on('$.ready', () => {
  console.log('ChatEngine is ready');

  // Connect user after ChatEngine is ready
  const me = chatEngine.connect('username', {
    signedOnTime: Date.now(),
    authKey: 'auth-key'
  });

  me.on('$.online', () => {
    console.log('You are online');
  });

  me.on('$.offline', () => {
    console.log('You are offline');
  });

  chatEngine.global.on('voice-chat-offer', (payload) => {
    // Broadcast voice chat offer
    chatEngine.global.emit('voice-chat-offer', payload);
  });

  chatEngine.global.on('voice-chat-answer', (payload) => {
    // Broadcast voice chat answer
    chatEngine.global.emit('voice-chat-answer', payload);
  });
});

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
