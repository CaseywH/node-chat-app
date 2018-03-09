var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  socket.emit('createMessage', {
    from: 'joey bag-a-donuts',
    text: 'hey this is Joey from East Tuna Fish'
  });

})

socket.on('newMessage', function (message) {
  console.log('==New Message==',message);
})


socket.on('disconnect', function () {
  console.log('disconnected from server');
});
