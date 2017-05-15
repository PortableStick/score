const express = require('express');
const router = express.Router();
const { STATEKEY } = require('../constants')

router.get('/', (request, response) => {
    response.redirect('/')
})

module.exports = router