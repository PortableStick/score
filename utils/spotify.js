const { getJSON, postJSON } = require('./ajaxOps')
const {
    SPOTIFY_URL
} = require('../constants')

function getUser(token) {
    return getJSON(`${SPOTIFY_URL}me`, null, { 'Authorization': `Bearer ${token}` })
}

module.exports = { getUser }