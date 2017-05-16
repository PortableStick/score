const { getPlaylists } = require("../utils/spotify")

function getUserPlaylists(request, response, next) {
    const token = request.session.grant ? request.session.grant.response.access_token : undefined
    if (token) {
        getPlaylists(token)
            .then(data => {
                request.user.playlists = data.items
                next()
            })
            .catch(error => console.error(error))
    } else {
        next()
    }
}

module.exports = getUserPlaylists