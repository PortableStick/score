const mongoose = require('mongoose')

const AlbumSchema = new mongoose.Schema({
    album_type: String,
    artists: [{
        external_urls: {
            spotify: String
        },
        href: String,
        id: String,
        name: String,
        type: String,
        uri: String
    }],
    available_markets: [String],
    external_urls: {
        spotify: String
    },
    href: String,
    id: String,
    images: [{
        height: Number,
        url: String,
        width: Number
    }],
    name: String,
    type: String,
    uri: String,
    tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'track' }]
})

module.exports = mongoose.model('album', AlbumSchema)