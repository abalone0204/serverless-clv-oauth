'use strict'

module.exports.handler = function(event, context) {
    console.log('event ==>', event);
    if (!!event.code) {
        context.succeed('redirecting')
    } else {
        context.fail(new Error('code not found'))
    }
}