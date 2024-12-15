import pg from 'pg'
export let db: pg.Client | null = null
export default defineNitroPlugin(async (nitro) => {
    try {
        const config = useRuntimeConfig()
        db = new pg.Client({
            user: config.postgresUser,
            password: config.postgresPassword,
            host: config.postgresHost,
            port: Number(config.postgresPort),
            database: config.postgresDb,
        })

        await db.connect().catch((e) => {
            console.log(`Error with db connection: ${e}`)
        })

        const result = await db.query('SELECT NOW()')
        console.log(result)
    } catch(e) {
        console.log(e)
    }
})
