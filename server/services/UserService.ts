import {db} from "~/server/plugins/db";
import {Tables} from "~/server/types/Tables";
import {User} from "~/server/models/User";
import bcrypt from 'bcrypt'
//TODO add event handler for db operations
class UserService {
    private tableName = Tables.Users
    async create(user: User) {
            console.log(`Creating user ${user.username}`);
            const { username, password } = user;
            const res =  await db?.query(
                `
            INSERT INTO ${this.tableName} (username, password) 
            VALUES ($1, $2) RETURNING *`,
                [username, bcrypt.hashSync(password, 8)],
            );
        return res?.rows[0] ?? null;
    }

    async getByUserName(user: User) {
            const res = await db?.query(
                `
                SELECT * from ${this.tableName} WHERE username = $1
            `,
                [user.username],
            );

        return res?.rows[0] ?? null
    }
    async getAll() {
        const res =  await db?.query(`
                SELECT * from ${this.tableName}
        `)

        return res?.rows ?? []
    }

    async getRolesByUserId(userId: number) {

        const res =  await db?.query(`
            SELECT ur.user_id, ur.role_id, r.name as role_name
            FROM users_roles as ur
            LEFT JOIN role as r
            ON ur.role_id = r.id
            WHERE user_id = ${userId}
        `);

        return res?.rows ?? [];
    }
}

export default new UserService()