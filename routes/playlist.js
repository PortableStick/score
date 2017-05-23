const express = require('express')
const router = express.Router()
const { createPlaylist, addTrackToPlaylist } = require('../utils/spotify')

router.post('/', (request, response) => {
    const newPlaylist = request.body
    const token = request.session.grant.response.access_token
    createPlaylist(token, newPlaylist, request.user)
        .then(data => {
            response.json(data)
        })
        .catch(error => response.json(error))
})

router.put('/:playlist/tracks/:trackid', (request, response) => {
    const playlistId = request.params.playlist
    const trackId = request.params.trackid
    const token = request.session.grant.response.access_token
    const user = request.user
    addTrackToPlaylist(token, user, playlistId, trackId)
        .then(data => response.json(data))
        .catch(error => response.json(error))
})
module.exports = router