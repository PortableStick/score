const express = require('express');
const router = express.Router();
const { refreshToken } = require('../utils/spotify');

router.get('/', (request, response) => {

    const token = request.session.grant.response.refresh_token;
    refreshToken(token)
        .then(data => {
            request.session.grant.response.raw = data;
            request.session.grant.response.access_token = data.access_token;
            response.redirect('/');
        })
        .catch(error => {
            console.error('Error at /refresh', error);
        });
});

module.exports = router;
