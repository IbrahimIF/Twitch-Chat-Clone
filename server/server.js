const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:  process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  }
});

// Track connected users
const connectedUsers = new Set();
const userData = new Map(); 

const twitchUsernameColors = [
  "#FF0000", // Red
  "#0000FF", // Blue
  "#00FF00", // Green
  "#B22222", // FireBrick
  "#FF7F50", // Coral
  "#9ACD32", // YellowGreen
  "#FF4500", // OrangeRed
  "#2E8B57", // SeaGreen
  "#DAA520", // GoldenRod
  "#D2691E", // Chocolate
  "#5F9EA0", // CadetBlue
  "#1E90FF", // DodgerBlue
  "#FF69B4", // HotPink
  "#8A2BE2", // BlueViolet
  "#00FF7F", // SpringGreen
  "#FF6347", // Tomato
  "#4682B4", // SteelBlue
  "#9400D3", // DarkViolet
  "#9932CC", // DarkOrchid
  "#FF1493", // DeepPink
  "#00BFFF", // DeepSkyBlue
  "#696969", // DimGray
  "#FF00FF", // Magenta
  "#4B0082", // Indigo
];

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);
  connectedUsers.add(socket.id); // Track user

  if (!userData.has(socket.id)) {
    userData.set(socket.id, {
      color: twitchUsernameColors[Math.floor(Math.random() * twitchUsernameColors.length)], 
      badges: [],
      username: 'Guest' + socket.id.slice(0, 4)
    });
    console.log("Assigned colour:", userData.get(socket.id).color);
  }

  socket.on('message', (message) => {
    console.log('Message received:', message);
    const user = userData.get(socket.id);


    if (user && message.username) {
      user.username = message.username;
      userData.set(socket.id, user); // Update the map
    }

    
    const messageToEmit = { 
      id: Date.now().toString(),
      author: {
        rgbColor: user.color,
        badges: user.badges,
        username: user.username,
      },
      content: message.content,
    };

    console.log('Emitting new-message:', messageToEmit.content); 
    io.emit('new-message', messageToEmit);
  });


  socket.on('disconnect', () => { 
    console.log('User disconnected:', socket.id);
    connectedUsers.delete(socket.id);
    userData.delete(socket.id); // Clean up user data on disconnect
  });
});

server.listen(PORT, () => {
  console.log(`Socket.io server running '${PORT}'`);
});