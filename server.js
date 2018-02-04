const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');
const now = moment();

app.use(express.static(__dirname + '/public'));

let clientInfo = {};

io.on('connection', function (socket) {
    console.log('User connected via socket.io');

    // socket.emit('message', {
    //     name: 'System',
    //     text: 'Welcome to the chat application!',
    //     timestamp: now.valueOf()
    // });

    socket.on('joinRoom', function (req) {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: req.name + ' has joined the room',
            timestamp: now.valueOf()
        });
    });

    socket.on('message', function (message) {
        message.timestamp = now.valueOf();
        console.log('Message received from: ' + message.name);
        console.log(message.timestamp + ' ' + message.text);
        io.to(clientInfo[socket.id].room).emit('message', message);
        // socket.broadcast.emit('message', message);
    });
});

http.listen(PORT, function () {
    console.log('Server started!!');
});