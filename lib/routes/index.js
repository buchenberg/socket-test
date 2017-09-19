'use strict';

exports.register = function (server, options, next) {

    const io = require('socket.io')(server.listener);
    var socket;

    io.on('connection', function (skt) {
        console.log("New client connected")

        socket = skt;

        socket.emit('Yo');

        socket.on('burp', function () {
            console.log('burp from client')
            socket.emit('tisk', 'Excuse you!');
        });
    });

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

    server.route({
        method: 'POST',
        path: '/api/slow',
        handler: function (request, reply) {
            (function fn(n) {
                socket.emit('increase', { number: n})
                if (n < 9) setTimeout(function () {
                    fn(++n);
                }, 1000);
            }(0));
            reply('Triggered slow');
        }
    });

    

    

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};