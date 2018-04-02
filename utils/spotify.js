const { getJSON, postJSON, postFormData, deleteJSON } = require('./ajaxOps');
const { SPOTIFY_URL, SPOTIFY_REFRESH_URL, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = require('../constants');

function getFromSpotify(token, url) {
    return getJSON(`${SPOTIFY_URL}${url}`, null, { 'Authorization': `Bearer ${token}` });
}

function postToSpotify(token, url, body = {}, queries = []) {
    return postJSON(`${SPOTIFY_URL}${url}`, body, queries, { 'Authorization': `Bearer ${token}` });
}

function deleteFromSpotify(token, url, body = {}, queries = []) {
    return deleteJSON(`${SPOTIFY_URL}${url}`, body, queries, { 'Authorization': `Bearer ${token}` });
}

function getUser(token) {
    return getFromSpotify(token, 'me');
}

function getPlaylists(token) {
    return getFromSpotify(token, 'me/playlists');
}

function getPlaylist(token, user, playlistId) {
    return getFromSpotify(token, `users/${user.id}/playlists/${playlistId}`);
}

function createPlaylist(token, body, user) {
    return postToSpotify(token, `users/${user.id}/playlists`, body);
}

function addTrackToPlaylist(token, user, playlistId, trackId) {
    return postToSpotify(token, `users/${user.id}/playlists/${playlistId}/tracks`, { uris: [ trackId ] });
}

function deleteTrackFromPlaylist(token, user, playlistId, trackId) {
    return deleteFromSpotify(token, `users/${user.id}/playlists/${playlistId}/tracks`, { tracks: [{ uri: `spotify:track:${trackId}` }] });
}

function getAlbums(token, title) {
    return getFromSpotify(token, `search?type=album&q=${title}`);
}

function getTracks(token, albums) {
    const promises = albums.map(album => getFromSpotify(token, `albums/${album.id}/tracks`));
    return Promise.all(promises);
}

function refreshToken(refresh_token) {
    const refreshBody = {
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token
    };
    const encodedSecret = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
    return postFormData(`${SPOTIFY_REFRESH_URL}`, refreshBody, null, { 'Authorization': `Basic ${encodedSecret}` });
}

module.exports = { getUser, getPlaylists, createPlaylist, refreshToken, getAlbums, getTracks, addTrackToPlaylist, getPlaylist, deleteTrackFromPlaylist };
