var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io =io;

io.on('connection',(socket)=>{
    console.log('a client connected');
});

module.exports =socketApi;
