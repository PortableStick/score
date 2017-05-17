require('es6-promise').polyfill();
require('isomorphic-fetch');
const { GET_HEADERS, POST_HEADERS } = require('../constants')

/**
 * @typedef QueryObject
 * @type {Object}
 * @property {string} name
 * @property {string} value
 */


/**
 * @param {QueryObject[]} queries
 * @return {string}
 */
function createQueries(queries) {
    if (!queries) { return '' }
    return queries.map(function(query, index) {
        return `${index === 0 ? '?' : '&'}${query.name}=${encodeURIComponent(query.value)}`
    }).join('')
}

/**
 * @param {Object} response
 * @return {Object}
 */

function handleResponse(response) {
    if (response.ok) {
        return Promise.resolve(response.json())
    }
    return Promise.reject({ 'message': response.statusText, 'status': response.status })
}

/**
 * @param {string} url
 * @param {QueryObject[]} [queries=[]]
 * @param {Object} [headers={}]
 * @return {Promise}
 */
function getJSON(url, queries = [], headers = {}) {
    const header = Object.assign({}, GET_HEADERS, headers)
    return fetch(`${url}${createQueries(queries)}`, { headers: Object.assign({}, GET_HEADERS, headers) })
        .then(handleResponse)
}

/**
 * @param {string} url
 * @param {QueryObject[]} [queries=[]]
 * @param {Object} [headers={}]
 * @return {Promise}
 */
function postJSON(url, body, queries = [], headers = {}) {
    return fetch(`${url}${createQueries(queries)}`, { headers: Object.assign({}, POST_HEADERS, headers), body: JSON.stringify(body), method: 'POST' })
        .then(handleResponse)
}

/**
 * @param {string} url
 * @param {QueryObject[]} [queries=[]]
 * @param {Object} [headers={}]
 * @return {Promise}
 */
function postFormData(url, body, queries = [], headers = {}) {
    let formBody = ''
    for (let X in body) {
        formBody += `${formBody !== '' ? '&' : ''}${X}=${body[X]}`
    }
    return fetch(`${url}${createQueries(queries)}`, { headers: Object.assign({}, { 'Content-Type': 'application/x-www-form-urlencoded' }, headers), body: formBody, method: 'POST' })
        .then(handleResponse)
}

module.exports = { getJSON, postJSON, postFormData }