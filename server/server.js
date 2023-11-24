const { Socket } = require('socket.io');

const io = require('socket.io')(3000, {
    cors: {
        origin: "*",
    }
});
const users = {};
io.on('connection', socket => {
    socket.on('user-joined', name => {
        users[socket.id] = name;// add the user to the list
        socket.broadcast.emit("new-user-joined", name);// send a message to everyone except the user
    });
    //when someone sends message
    socket.on('send-msg', message => {
        //send it back to everyone except the user
        socket.broadcast.emit('receive-msg', { message: message, name: users[socket.id] });
    });
    //when any user leaves the chat
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-left', users[socket.id]);
        delete users[socket.id];
    });
});