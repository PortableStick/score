const router = require('express').Router();

router.get('/', (request, response) => response.send('Server is up'));

module.exports = router;
