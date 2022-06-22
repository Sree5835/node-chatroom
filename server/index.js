const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    io.emit('message', `${socket.id.substr(0,2)} joined the chat!` );

    socket.on('message', (message) =>     {
        console.log(`${socket.id.substr(0,2)} said ${message}`);
        io.emit('message', `${socket.id.substr(0,2)} said "${message}"` );
    });

    socket.on('disconnect', () => {
        io.emit('message', `${socket.id.substr(0,2)} joined the chat!` );
    });
});

server.listen(8080, () => console.log('listening on http://localhost:8080') );
