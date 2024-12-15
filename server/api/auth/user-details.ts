import jwt, {JwtPayload} from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'token')
    if (!token) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User is not authorized!'
        })
    }

    //TODO do it from env
    jwt.verify(token,'auth-sercet-very-strong', (error, decoded) => {
        if (error || !decoded) {
            throw createError({
                statusCode: 400,
                statusMessage: 'User is not authorized!'
            })
        }
        // response.status(200).json({
        //     user: decoded as JwtPayload,
        // });
        //TODO does it work?
        return {
            user: decoded as JwtPayload,
        }
    });
})