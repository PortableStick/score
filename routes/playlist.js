const express = require('express');
const router = express.Router();
const { createPlaylist, addTrackToPlaylist, getPlaylist } = require('../utils/spotify');

router.get('/:playlist', (request, response) => {
    const token = request.session.grant.response.access_token;
    const playlistId = request.params.playlist;
    const user = request.user;
    getPlaylist(token, user, playlistId)
        .then(data => response.json(data))
        .catch(error => {
            console.error(error);
            response.json(error);
        });
});

router.post('/', (request, response) => {
    const newPlaylist = request.body;
    const token = request.session.grant.response.access_token;
    createPlaylist(token, newPlaylist, request.user)
        .then(data => {
            response.json(data);
        })
        .catch(error => response.json(error));
});

router.put('/:playlist/tracks/', (request, response) => {
    const playlistId = request.params.playlist;
    const trackId = request.body.uri;
    const token = request.session.grant.response.access_token;
    const user = request.user;
    addTrackToPlaylist(token, user, playlistId, trackId)
        .then(data => response.json(data))
        .catch(error => response.json(error));
});
module.exports = router;
