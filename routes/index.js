const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const { TMDB_IMAGE_URL, TMDB_BACKDROP_URL } = require('../constants');

router.get('/', function(request, response) {
    Movie.find({})
        .then(movies => {
            response.render('index', { movies, imgurl: TMDB_IMAGE_URL, bdurl: TMDB_BACKDROP_URL, user: request.user, filters: {
              'handlebars': text => {
                return text;
              } 
            } });
        });
});

module.exports = router;
