const { getUser } = require('../utils/spotify')

function getUserData(request, response, next) {
    const token = request.session.grant ? request.session.grant.response.access_token : undefined
    if (token) {
        getUser(token)
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