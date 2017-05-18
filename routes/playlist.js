const express = require('express')
const router = express.Router()
const { createPlaylist } = require('../utils/spotify')

router.post('/', (request, response) => {
    const newPlaylist = request.body
    const token = request.session.grant.response.access_token
    createPlaylist(token, newPlaylist, request.user)
        .then(() => {
            response.redirect('/')
        })
        .catch(error => response.redirect('/'))
})

module.exports = router