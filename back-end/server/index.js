const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io'); // Import Server from socket.io
const { PeerServer } = require('peer');
const peerServer = PeerServer({ port: 9000, path: '/peerjs' }); // Adjust port number as needed
const ProductsRoutes=require("../Routes/ProductsRoutes")
const Postes=require("../Routes/Postes")
const userRoutes=require("../Routes/user")
const commentRoutes=require("../Routes/CommentRoutes")
const latestGames=require("../Routes/FeaturedGamesRoutes")
const trending=require("../Routes/TrendingDiscussionRoutes")
const latestNews=require("../Routes/LatestNewsRoutes")
const admin = require('firebase-admin');
const ChatEngine = require('chat-engine');



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
// app.use(cors());app.use(cors())
app.use('/peerjs', peerServer);
app.use(cors())
app.use(express.json()); // Add this line
app.use('/products', ProductsRoutes); // Add this line
app.use("/postes", Postes)
app.use('/users', userRoutes)
app.use('/comments', commentRoutes);
app.use("/games",latestGames)
app.use("/new",latestNews)
app.use("/trending",trending)



// app.use('/peerjs', peerServer);

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
// chatEngine.on('$.ready', () => {
//   console.log('ChatEngine is ready');


// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
