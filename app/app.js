const { io } = require("socket.io-client");
const socket = io('ws://localhost:8080');
const prompt = require('prompt-sync')({sigint: true});


socket.on('message', text => {
    console.log(text);
    //once a message is received, this code displays it and
    //awaits a response from user
});

async function myFunction() {
  return prompt('message: ');
}


async function get_input() {
  let message = new Promise(function(resolve) {
    resolve(prompt('message: '));
  });
    socket.emit('message', await message);

}
get_input();
