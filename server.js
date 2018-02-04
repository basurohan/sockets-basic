const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');
const now = moment();

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('User connected via socket.io');

    socket.emit('message', {
        text: 'Welcome to the chat application!',
        timestamp: now.valueOf()
    });

    socket.on('message', function (message) {
        message.timestamp = now.valueOf();
        console.log('Message received: ' + message.timestamp + ' ' + message.text);
        io.emit('message', message);
        // socket.broadcast.emit('message', message);
    });
});

http.listen(PORT, function () {
    console.log('Server started!!');
});