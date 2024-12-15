import UserService from "~/server/services/UserService";
import AuthService from "~/server/services/AuthService";

export default defineEventHandler(async (event) => {
    const {user} = await readBody(event);

    if (!user) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User data not found!'
        })
    }

    const existingUser = await UserService.getByUserName(user)

    if (existingUser) {
        throw createError({
            statusCode: 409,
            statusMessage: `User with username ${user.username} already exist!`
        })
    }

    const newUser = await UserService.create(user)
    const { userRoles, token } = await AuthService.createToken(newUser);
    setCookie(event, 'token', token, {
        secure: false,
        httpOnly: true,
        expires: new Date(Date.now() + 86400000),
    })
    return {
        message: 'You successfully created and signed in!',
        user: {
            id: newUser.id,
            username: newUser.username,
            roles: userRoles,
        },
    }
})