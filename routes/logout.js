const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    request.session.destroy(error => {
        console.error(error);
    });
    response.redirect('/');
});

module.exports = router;
