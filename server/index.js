const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//the code above establishes a WebSocket (via socket.io) connection over http by express

io.on('connection', (socket) => {
    io.emit('message', `${socket.id.substr(0,5)} joined the chat!` );

    /*once a connection is established, the unique identity
     of each connection is made to be first 5 chars in socket.id
    */

    socket.on('message', (message) =>     {
        //once a socket sends a message, the server's responsibility is to
        // emit it to all other connections
        io.emit('message', `${socket.id.substr(0,5)} said \"${message}\"` );
    });

    socket.on('disconnect', () => {
        //once a socket disconnects, server emits that to all connections as well
        //this feature is better for use with web interface since disconnection happens when you refresh
        io.emit('message', `${socket.id.substr(0,5)} left the chat!` );
    });

    socket.on('error',(err)=>{
        console.log(error);
        io.emit('message', err);
    })
});

server.listen(8080, () => console.log('listening on http://localhost:8080') );
