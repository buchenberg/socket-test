'use strict';

exports.register = function (server, options, next) {
    
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.'
            }
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};