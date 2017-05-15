const SPOTIFY_CONFIG = require('./constants').SPOTIFY_CONFIG;

module.exports = {
    "development": {
        "server": {
            "protocol": "http",
            "host": "localhost:3000",
            "transport": "session",
            "state": true
        },
        "spotify": SPOTIFY_CONFIG
    },
    "production": {
        "server": {
            "protocol": "https",
            "host": "",
            "callback": "/callback",
            "transport": "session",
            "state": true
        },
        "spotify": SPOTIFY_CONFIG
    }
}