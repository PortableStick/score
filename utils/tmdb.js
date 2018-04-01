const { TMDB_API_KEY, TMDB_URL } = require('../constants');
const { getJSON } = require('./ajaxOps');

/**
 * @return {Promise}
 */
function getPopularMovies() {
    const query = [{
        'name': 'sort_by',
        'value': 'popularity.desc'
    },
    {
        'name': 'api_key',
        'value': TMDB_API_KEY
    }
    ];
    return getJSON(`${TMDB_URL}discover/movie`, query)
        .then(data => data.results);
}

module.exports = { getPopularMovies };
