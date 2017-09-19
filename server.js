'use strict';

const Glue = require('glue');
const Path = require('path');

const manifest = {
    server: {},
    connections: [
        {
            port: 8000,
            labels: ['web'],
            routes: {
                files: {
                    relativeTo: Path.join(__dirname, 'public')
                }
            }
        }
    ],
    registrations: [
        {
            plugin: require('blipp')
        },
        {
            plugin: require('inert')
        },
        {
            plugin: {
                register: './lib/routes'
            }
        },
        {
            plugin: {
                register: './lib/ui'
            }
        }
    ]
};

const options = {
    relativeTo: __dirname
};

Glue.compose(manifest, options, (err, server) => {

    if (err) {
        throw err;
    }

    server.start(() => {

        console.log('hapi days!');
    });
});