
module.exports = connectSockets

function connectSockets(io) {
    console.log('connect');
    io.on('connection', socket => {
        socket.on('chat newMsg', msg => {
            io.emit('chat addMsg', msg)
        })
        socket.on("user typing", (userName) => {
            io.emit('show typing', userName)
        });
        socket.on("new member", (member) => {
            io.emit('show member', member)
        });
    })
}


