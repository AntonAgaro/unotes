import type { EventHandler, EventHandlerRequest } from 'h3'
//TODO можно переопределить базовый defineEventHandler в роутах
export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D> (
    handler: EventHandler<T, D>
): EventHandler<T, D> =>
    defineEventHandler<T>(async event => {
        try {
            console.log('123123123')
            // do something before the route handler
            const response = await handler(event)
            // do something after the route handler
            return { response }
        } catch (err) {
            // Error handling
            console.log(err)
            throw createError({
                statusMessage: 'Server error!',
                statusCode: 500
            })
        }
    })