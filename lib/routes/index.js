'use strict';

exports.register = function (server, options, next) {
    
    server.route({
        method: 'GET',
        path: '/api',
        handler: function (request, reply) {
            reply('api index');
        }
    });

    server.route({
        method: 'GET',
        path: '/api/yo',
        handler: function (request, reply) {
            socket.emit('Yo');
            reply('Triggered yo');
        }
    });

    var io = require('socket.io')(server.listener);
    
    io.on('connection', function (socket) {
        console.log("New client connected")
    
        socket.emit('Yo');
    
        socket.on('burp', function () {
            console.log('burp from server')
            socket.emit('Excuse you!');
        });
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};