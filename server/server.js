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

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);
  connectedUsers.add(socket.id); // Track user

  if (!userData.has(socket.id)) {
    userData.set(socket.id, {
      color: `hsl(${Math.floor(Math.random() * 60) + 200}, 70%, 60%)`, 
      badges: []
    });
    console.log("Assigned colour:", userData.get(socket.id).color);
  }

  socket.on('message', (message) => {
    console.log('Message received:', message);
    const user = userData.get(socket.id);
    
    io.emit('new-message', { 
      id: Date.now().toString(),
      author: {
        rgbColor: user.color,
        badges: user.badges,
        username: 'User' + socket.id.slice(0, 4),
      },
      content: message,
    });
  });

  socket.on('disconnect', () => { 
    console.log('User disconnected:', socket.id);
    connectedUsers.delete(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Socket.io server running`);
});