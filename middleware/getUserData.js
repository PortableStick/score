const { getUser } = require('../utils/spotify')

function getUserData(request, response, next) {
    const token = request.session.grant ? request.session.grant.response.access_token : undefined
    if (token) {
        getUser(token)
            .then(user => {
                request.user = user
                next()
            })
            .catch(error => {
                if (error.status === 401) { response.redirect('/refresh') } else { console.error('error while fetching user data, ', error) }
            })
    } else {
        next()
    }
}

module.exports = getUserData