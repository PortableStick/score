const express = require('express')
const router = express.Router()
const { createPlaylist } = require('../utils/spotify')

router.get('/', (request, response) => {
    const newPlaylist = request.body
    const token = request.session.grant.response.access_token
    createPlaylist(token, newPlaylist, request.user)
})

module.exports = router