const { io } = require("socket.io-client");
const socket = io('ws://localhost:8080');
const readline = require('readline');


const rl = readline.createInterface({
    //prepares the input feature
    input: process.stdin,
    output: process.stdout
});


socket.on('message', text => {
    console.log(text);
    //once a message is received, this code displays it and
    //awaits a response from user
    rl.question('', message => {
        socket.emit('message', message)
        rl.close();
    });
});
