const socketConnection = (io) =>{
    io.on('connection', (socket) => {
    console.log('user connected');
    // console.log("Additional Data about the user from the client side =", socket.handshake.query)
    socket.on('disconnect', function () {
      console.log('user disconnected');
    });
});
}

module.exports = { socketConnection };