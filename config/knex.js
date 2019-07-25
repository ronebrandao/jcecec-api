const database = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_DATABASE,
    port: process.env.DB_PORT
}

console.log(database)

const knex = require('knex')({
    client: 'pg',
    connection: {
        host : database.host,
        user : database.user,
        password : database.password,
        database : database.name,
        port: database.port,
        ssl: true
    },
    pool: { min: 0}
});

module.exports = {
    knex: knex
}