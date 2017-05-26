const path = require('path')
const DEVELOPMENT = process.env.NODE_ENV === 'development'

const API_URL = DEVELOPMENT ? `http://localhost:${process.env.PORT || 3000}` : 'https://get-score.herokuapp.com'
const HOSTNAME = "get-score.herokuapp.com"
const MONGO_URL = DEVELOPMENT ? 'mongodb://localhost:27017/spotify_integration_development' : process.env.MONGODB_URI
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret'

const CALLBACK_URL = `${API_URL}/callback`

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID

if (!SPOTIFY_CLIENT_ID) {
    throw new Error('Spotify API key required!')
}

const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

if (!SPOTIFY_CLIENT_SECRET) {
    throw new Error('Spotify API key required!')
}

const TMDB_API_KEY = process.env.TMDB_API_KEY

if (!TMDB_API_KEY) {
    throw new Error('TMDB API key required!')
}

const SPOTIFY_URL = 'https://api.spotify.com/v1/'
const SPOTIFY_LOGIN_URL = 'https://accounts.spotify.com/authorize/'
const SPOTIFY_REFRESH_URL = 'https://accounts.spotify.com/api/token'
const TMDB_URL = 'https://api.themoviedb.org/3/'
const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/w185'
const TMDB_BACKDROP_URL = 'https://image.tmdb.org/t/p/original'

const GET_HEADERS = {
    'Accept': 'application/json'
}
const STATEKEY = 'spotify_auth_state'
const SPOTIFY_SCOPES = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'].join(' ')
const SPOTIFY_CONFIG = {
    "client_id": SPOTIFY_CLIENT_ID,
    "client_secret": SPOTIFY_CLIENT_SECRET,
    "response_type": 'code',
    "scope": SPOTIFY_SCOPES,
    "callback": '/callback'
}

/**
 * @typedef Options
 * @type any
 */
const SASSCONFIG = {
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: DEVELOPMENT ? 'expanded' : 'compressed'
}

const REDIS_CONFIG = DEVELOPMENT ? { hostname: 'localhost', port: '6379', auth: 'username:password' } : require("url").parse(process.env.REDISTOGO_URL)
module.exports = {
    HOSTNAME,
    REDIS_CONFIG,
    DEVELOPMENT,
    MONGO_URL,
    SASSCONFIG,
    GET_HEADERS,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_URL,
    SPOTIFY_LOGIN_URL,
    SPOTIFY_REFRESH_URL,
    TMDB_API_KEY,
    TMDB_URL,
    TMDB_IMAGE_URL,
    TMDB_BACKDROP_URL,
    API_URL,
    CALLBACK_URL,
    SPOTIFY_SCOPES,
    STATEKEY,
    SESSION_SECRET,
    SPOTIFY_CONFIG
}