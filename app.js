const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Grant = require('grant-express');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const mongoose = require('mongoose')
const sassMiddleware = require('node-sass-middleware')
const getUserData = require('./middleware/getUserData')
const getUserPlaylists = require('./middleware/getUserPlaylists')
const logout = require('./routes/logout')
const refresh = require('./routes/refresh')
const playlist = require('./routes/playlist')
const tracks = require('./routes/tracks')
const app = express();
const { SESSION_SECRET, MONGO_URL, SASSCONFIG, REDIS_CONFIG } = require('./constants')
const redisClient = require('redis').createClient(REDIS_CONFIG.port, REDIS_CONFIG.hostname)
redisClient.auth(REDIS_CONFIG.auth.split(":")[1])
const GRANT_CONFIG = require('./grantConfig')

const grant = new Grant(GRANT_CONFIG[process.env.NODE_ENV || 'production']);
// Routes

const healthCheck = require('./routes/healthCheck')
const callback = require('./routes/callback')
const index = require('./routes/index')
const about = require('./routes/about')

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URL)
    // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(sassMiddleware(SASSCONFIG))
    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: SESSION_SECRET, saveUninitialized: true, resave: true, store: new RedisStore({ client: redisClient }) }))
app.use(grant)


// Routes
app.use('/refresh', refresh)
app.use('/healthCheck', healthCheck)
app.use('/callback', callback)
app.use('/logout', logout)
app.use('/tracks', getUserData, tracks)
app.use('/playlists', getUserData, playlist)
app.use('/about', getUserData, about)
app.use('/', getUserData, getUserPlaylists, index)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;