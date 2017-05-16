const { getJSON, postJSON } = require('./ajaxOps')
const { SPOTIFY_URL } = require('../constants')

function getFromSpotify(token, url) {
    return getJSON(`${SPOTIFY_URL}${url}`, null, { 'Authorization': `Bearer ${token}` })
}

function postToSpotify(token, url, body) {
    return postJSON(`${SPOTIFY_URL}${url}`, body, null, { 'Authorization': `Bearer ${token}` })
}

function getUser(token) {
    return getFromSpotify(token, 'me')
}

function getPlaylists(token) {
    return getFromSpotify(token, 'me/playlists')
}

function createPlaylist(token, body, user) {
    return postToSpotify(token, body, `users/${user.id}/playlists`)
}
module.exports = { getUser, getPlaylists, createPlaylist }