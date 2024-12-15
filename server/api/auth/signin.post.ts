import UserService from "~/server/services/UserService";
import bcrypt from "bcrypt";
import AuthService from "~/server/services/AuthService";

export default defineEventHandler(async (event) => {
    const { user } = await readBody(event)

    if (!user) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User data not found!'
        })
    }

    const existingUser = await UserService.getByUserName(user);

    if (!existingUser) {
        throw createError({
            statusCode: 404,
            statusMessage: `User with username ${user.username} not found!`
        })
    }

    const isPasswordValid = bcrypt.compareSync(
        user.password,
        existingUser.password,
    );

    if (!isPasswordValid) {
        throw createError({
            statusCode: 401,
            statusMessage: `Password for user ${user.username} is incorrect!`
        })
    }

    const { userRoles, token } = await AuthService.createToken(existingUser);

    setCookie(event, 'token', token, {
        secure: false,
        httpOnly: true,
        expires: new Date(Date.now() + 86400000),
    })

    return {
        message: 'You successfully signed in!',
        user: {
            id: existingUser.id,
            username: existingUser.username,
            roles: userRoles,
        },
    }
})