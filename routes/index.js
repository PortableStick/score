const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model')
const { TMDB_IMAGE_URL } = require('../constants')
const getUserData = require('../middleware/getUserData')
const getUserPlaylists = require('../middleware/getUserPlaylists')

router.get('/', getUserData, getUserPlaylists, function(request, response) {
    Movie.find({})
        .then(movies => {
            response.render('index', { movies, imgurl: TMDB_IMAGE_URL, user: request.user })
        })
});

module.exports = router;