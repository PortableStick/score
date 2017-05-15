const { getUser } = require('../utils/spotify')

function getUserData(request, response, next) {
    if (request.session.grant) {
        getUser(request.session.grant.response.access_token)
            .then(user => {
                request.user = user
                next()
            })
            .catch(error => console.error(error))
    } else {
        next()
    }
}

module.exports = getUserData