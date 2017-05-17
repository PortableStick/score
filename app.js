const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Grant = require('grant-express');
const session = require('express-session')
const redisClient = require('redis').createClient()
const RedisStore = require('connect-redis')(session)
const mongoose = require('mongoose')
const sassMiddleware = require('node-sass-middleware')
const getUserData = require('./middleware/getUserData')
const getUserPlaylists = require('./middleware/getUserPlaylists')
const logout = require('./routes/logout')
const refresh = require('./routes/refresh')
const app = express();
const { SESSION_SECRET, MONGO_URL, SASSCONFIG } = require('./constants')
const GRANT_CONFIG = require('./grantConfig')

const grant = new Grant(GRANT_CONFIG[process.env.NODE_ENV || 'production']);
// Routes

const healthCheck = require('./routes/healthCheck')
const callback = require('./routes/callback')
const index = require('./routes/index')

const redisStoreOptions = {
    client: redisClient,
    port: 6379,
    host: 'localhost'
}
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
app.use(session({ secret: SESSION_SECRET, saveUninitialized: true, resave: true, store: new RedisStore(redisStoreOptions) }))
app.use(grant)


// Routes
app.use('/refresh', refresh)
app.use('/', index)
app.use('/healthCheck', healthCheck)
app.use('/callback', callback)
app.use('/logout', logout)

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