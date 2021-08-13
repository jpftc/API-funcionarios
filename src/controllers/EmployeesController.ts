import express from 'express'
const router = express.Router()
const knex = require('../database')
const adminAuth = require('../middlewares/adminAuth')
const validateData = require('./ValidateData')

router.get('/employees', adminAuth.adminAuth, async (req, res) => {
    const result = await knex('employees')
    if (result.length > 0) {
        res.status(200)
        return res.json(result)
    } else {
        res.status(500)
        return res.json({ err: 'Erro itnerno do servidor' })
    }
})

router.get('/employee/:id', adminAuth.adminAuth, async (req, res) => {
    const id = req.params.id
    const result = await knex('employees').where({ 'id': id })
    if (result.length > 0) {
        res.status(200)
        return res.json(result)
    } else {
        res.status(404)
        return res.json({ err: 'Registro não encontrado' })
    }
})

router.post('/employee', adminAuth.adminAuth, async (req, res) => {
    const { razao_social, nome, cpf, salario } = req.body
    const isValid = validateData.validateCPF(cpf)
    if (isValid) {
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
    } else {
        res.status(400)
        res.json({ err: 'Formato dos dados inválidos!' })
    }
})

export default router