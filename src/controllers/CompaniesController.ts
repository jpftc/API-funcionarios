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

export default router