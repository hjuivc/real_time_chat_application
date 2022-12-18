// server/index.js

const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors()); // Add cors middleware

const server = http.createServer(app); 

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

const CHAT_BOT = 'Chat Bot'; // The name of the chat bot.
let chatRoom = ''; // The chat room the user is in.
let allUsers = []; // All users in the chat room.

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  // Add a user to the room
  socket.on('join_room', (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted.
    socket.join(room); // Join the user to a socket room.
    
    let __createdtime__ = Date.now(); // Get the current time in milliseconds.
    // Send message to all users currently in the room, apart from the user who just joined.
    socket.to(room).emit('receive_message', {
      message: '${username} has joined the room.',
      username: CHAT_BOT,
      __createdtime__,
    });

    // Send message to the user who just joined the room.
    socket.emit('receive_message', {
      message: 'Welcome to the room ${username}.',
      username: CHAT_BOT,
      __createdtime__,
    });

  // Save the new user to the room
  chatRoom = room;
  allUsers.push({ id: socket.id, username, room });
  chatRoomUsers = allUsers.filter((user) => user.room === room);
  socket.to(room).emit('chatroom_users', chatRoomUsers);
  socket.emit('chatroom_users', chatRoomUsers);

  });
});

server.listen(4000, () => 'Server is running on port 4000');