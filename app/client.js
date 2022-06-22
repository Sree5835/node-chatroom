const socket = io('ws://localhost:8080');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


socket.on('message', text => {

    console.log(text);

});

document.querySelector('button').onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('message', text)

}


rl.question('Who are you?', name => {
  console.log(`Hey there ${name}!`);
  rl.close();
});
