const { io } = require("socket.io-client");
const socket = io('ws://localhost:8080');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

socket.on('message', text => {
    console.log(text);
    rl.question('Your message:', message => {
        socket.emit('message', message)
        rl.close();
    });
});
