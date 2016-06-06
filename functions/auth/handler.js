'use strict'

const endpointURI = 'https://d2xhcc9852.execute-api.ap-northeast-1.amazonaws.com/dev'

function getAccessTokenUrl(event) {
    const params = {
            appId: event.app_id,
            redirectURI: `${event.endpoint_url}/${event.stage}/${event.path}`,
            secret: event.secret,
            code: event.code,
            ip: event.ip
        }
    return `https://graph.facebook.com/v2.3/oauth/access_token?client_id=${params.appId}&redirect_uri=${params.redirectURI}&client_secret=${params.secret}&code=${params.code}`
}

module.exports.handler = function(event, context) {
    if (event.code) {
        const fetch = require('node-fetch')
        const url = getAccessTokenUrl(event)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                context.succeed(data)
            })
    } else {
        context.fail(new Error('code not found'))
    }
}