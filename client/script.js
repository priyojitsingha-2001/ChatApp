const socket = io('http://localhost:3000');
const messageSection = document.querySelector('.container');
const messageForm = document.querySelector('#send-msg');
const messageInput = document.querySelector('.msg-input');

const username = prompt("What is your name");
socket.emit('user-joined', username);

socket.on('new-user-joined', name => {
    displaymessage(`${name}: joined the chat`, 'left');
});

socket.on('receive-msg', data => {
    displaymessage(`${data.name}: ${data.message}`, 'left');
});

socket.on('user-left', name => {
    displaymessage(`${name}: left the chat`, 'left');
});


messageForm.addEventListener('submit', e => {
    e.preventDefault();
    if (messageInput == "") {
        return;
    }
    displaymessage(`${username}: ${messageInput.value}`, 'right');
    socket.emit('send-msg', messageInput.value);
    messageInput.value = "";
});

//this appends the message on the message section
function displaymessage(message, position) {
    const div = document.createElement('div');
    div.classList.add('msg', position);
    div.textContent = message;
    messageSection.append(div);
}


