export default defineEventHandler(async (event) => {
    deleteCookie(event, 'token');
    return {
        message: 'You successfully signed out!'
    }

})