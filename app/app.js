const { io } = require("socket.io-client");
const socket = io('ws://localhost:8080');
const blessed = require('neo-blessed');

    const screen = blessed.screen({
      smartCSR: true,
      title: 'Node Chatroom',
    });
    var messageList = blessed.list({
      align: 'left',
      mouse: true,
      keys: true,
      width: '100%',
      height: '90%',
      top: 0,
      left: 0,
      scrollbar: {
        ch: ' ',
        inverse: true,
      },
      items: [],
    });
    // Append our box to the screen.
    var input = blessed.textarea({
      bottom: 0,
      height: '10%',
      inputOnFocus: true,
      padding: {
        top: 1,
        left: 2,
      },
      style: {
        fg: '#787878',
        bg: '#454545',
        focus: {
          fg: '#f6f6f6',
          bg: '#353535',
        },
      },
    });
    input.key('enter', async function() {
      var message = this.getValue();
      try {
        await socket.emit("message",message);
      } catch (err) {
        socket.emit("error",err);
      } finally {
        this.clearValue();
        screen.render();
      }
    });
    // Append our box to the screen.
    screen.key(['escape', 'q', 'C-c'], function() {
      return process.exit(0);
    });
    screen.append(messageList);
    screen.append(input);
    input.focus();
    screen.render();
    socket.on('message', async text => {
      messageList.addItem(text);
      messageList.scrollTo(100);
      screen.render();
    });
