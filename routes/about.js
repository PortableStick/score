const router = require('express').Router()

router.get('/', (request, response) => {
    response.render('about', { user: request.user })
})

module.exports = router