const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
  //socket.emit from Admin text: welcome to chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  // socket.broadcast.emit from admin text new user joined
  socket.broadcast.emit('newMessage', generateMessage('Admin','new user joined'));



  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newlocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

  socket.on('disconnect', () => {
    console.log('client has disconnected');
  })

})



server.listen(port, () => {
  console.log(`Spinning up server on port ${port}`);
});
