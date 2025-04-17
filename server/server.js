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
const users = new Set(); 

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);
  users.add(socket.id); // Track user

  socket.on('message', (message) => {
    console.log('Message received:', message);
    
    io.emit('new-message', { 
      id: Date.now().toString(),
      author: { username: 'User' + socket.id.slice(0, 4) },
      content: message,
    });
  });

  socket.on('disconnect', () => { 
    console.log('User disconnected:', socket.id);
    users.delete(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Socket.io server running`);
});