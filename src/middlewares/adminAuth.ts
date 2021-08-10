import Knex from "knex"

const knex: Knex = require('../database')

module.exports = {
    async adminAuth(req: any, res: any, next: any) {
        const { username, password } = req.headers
        if (!username || !password) {
            res.status(401)
            res.json({ err: 'Falha de autenticação' })
        } else {
            let result = await knex('users').where({ 'username': username })
            if (result.length > 0) {
                if (result[0].password == password) {
                    next()
                } else {
                    res.status(401)
                    res.json({ err: 'Falha de autenticação' })
                }
            } else {
                res.status(401)
                res.json({ err: 'Falha de autenticação' })
            }
        }
    }
}