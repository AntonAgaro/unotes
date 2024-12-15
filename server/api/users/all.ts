import UserService from "~/server/services/UserService";

export default defineEventHandler(async (event) => {
    return await UserService.getAll()
})