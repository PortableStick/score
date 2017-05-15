const mongoose = require('mongoose')

const TrackSchema = new mongoose.Schema({
    "artists": [{
        "external_urls": {
            "spotify": String
        },
        "href": String,
        "id": String,
        "name": String,
        "type": String,
        "uri": String
    }],
    "available_markets": [String],
    "disc_number": Number,
    "duration_ms": Number,
    "explicit": Boolean,
    "external_urls": {
        "spotify": String
    },
    "href": String,
    "id": String,
    "name": String,
    "preview_url": String,
    "track_number": Number,
    "type": String,
    "uri": String
})

module.exports = mongoose.model('track', TrackSchema)