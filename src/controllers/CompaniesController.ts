import express from 'express'
const router = express.Router()
const knex = require('../database')
const adminAuth = require('../middlewares/adminAuth')

router.get('/companies', adminAuth.adminAuth, async (req, res) => {
    const result = await knex('companies')

    return res.json(result)
})

router.get('/companie/:id', adminAuth.adminAuth, async (req, res) => {
    let id = req.params.id
    const result = await knex('companies').where({ 'id': id }).first()

    return res.json(result)
})

router.post('/companie', adminAuth.adminAuth, async (req, res) => {
    const { razao_social, cnpj } = req.body
    let result = await knex('companies').where({ 'cnpj': cnpj })
    if (result.length > 0) {
        res.status(400)
        res.send({ err: 'CNPJ já está cadastrado na base de dados!' })
    } else {
        await knex('companies').insert({
            razao_social,
            cnpj
        })
        result = await knex('companies').where({ 'cnpj': cnpj })
        if (result.length > 0) {
            res.status(200)
            res.send({ msg: 'Registro inserido com sucesso!' })
        } else {
            res.status(500)
            res.send({ err: 'Falha ao inserir registro' })
        }
    }
})

export default router