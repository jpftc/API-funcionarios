import express from 'express'
const router = express.Router()
const knex = require('../database')
const adminAuth = require('../middlewares/adminAuth')

router.post('/employee', adminAuth.adminAuth, async (req, res) => {
    const { razao_social, nome, cpf, salario } = req.body
    const companie = await knex('companies').where({ 'razao_social': razao_social })
    const companieID = companie[0].id
    if (companie.length > 0) {
        let result = await knex('employees').where({ 'cpf': cpf })
        if (result.length > 0) {
            res.status(400)
            res.json({ err: 'CPF já está cadastrado na base de dados!' })
        } else {
            await knex('employees').insert({
                nome,
                cpf,
                salario,
                empresa_id: companieID
            })
            result = await knex('employees').where({ 'cpf': cpf })
            if (result.length > 0) {
                res.status(200)
                res.json(result)
            } else {
                res.status(500)
                return res.json({ err: 'Falha ao inserir registro' })
            }
        }
    } else {
        res.status(404)
        res.json({ err: 'Empresa não encontrada na base de daodos' })
    }
})

export default router