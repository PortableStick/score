const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    poster_path: String,
    adult: Boolean,
    overview: String,
    release_date: String,
    genre_ids: [Number],
    id: Number,
    original_title: String,
    original_language: String,
    title: String,
    backdrop_path: String,
    popularity: Number,
    vote_count: Number,
    video: Boolean,
    vote_average: Number
});

module.exports = mongoose.model('Movie', MovieSchema);
