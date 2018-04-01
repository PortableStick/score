const { SPOTIFY_CONFIG, HOSTNAME } = require('./constants');

module.exports = {
    'development': {
        'server': {
            'protocol': 'http',
            'host': 'localhost:3000',
            'transport': 'session',
            'state': true
        },
        'spotify': SPOTIFY_CONFIG
    },
    'production': {
        'server': {
            'protocol': 'https',
            'host': HOSTNAME,
            'transport': 'session',
            'state': true
        },
        'spotify': SPOTIFY_CONFIG
    }
};
