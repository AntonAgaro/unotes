import {User} from "~/server/models/User";
import UserService from "~/server/services/UserService";
import jwt from 'jsonwebtoken'

class AuthService {
    async createToken(user: User) {
        const userRoles = await UserService.getRolesByUserId(user.id);
        const token = jwt.sign(
            { id: user.id, username: user.username, roles: userRoles },
            //TODO do it from env
            'auth-sercet-very-strong',
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400,
            },
        );

        return { userRoles, token };
    }
}

export default new AuthService()