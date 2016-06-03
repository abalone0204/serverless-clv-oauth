'use strict';


function getAccessTokenUrl(params) {
    return `https://graph.facebook.com/v2.3/oauth/access_token?client_id=${params.appId}&redirect_uri=${params.redirectURI}&client_secret=${params.secret}&code=${params.code}`
}


const endpointURI = 'http://localhost:3000'

module.exports.handler = function(event, context) {
    console.log('event ==>', event);
    if (event.code) {
        const fetch = require('node-fetch')
        const params = {
            appId: event.app_id,
            redirectURI: `${endpointURI}${event.path}`,
            secret: event.secret,
            code: event.code,
            ip: event.ip
        }
        const url = getAccessTokenUrl(params)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                context.succeed(data)
            })

    } else {
        context.fail('fail')
    }

};