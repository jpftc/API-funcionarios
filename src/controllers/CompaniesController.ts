import express from 'express'
const knex = require('../database')
const validateData = require('./ValidateData')

module.exports = {
    async getCompanies(req: any, res: any) {
        const result = await knex('companies')
        if (result.length > 0) {
            res.status(200)
            return res.json(result)
        } else {
            res.status(500)
            return res.json({ err: 'Erro itnerno do servidor' })
        }
    },

    async getCompanie(req: any, res: any) {
        const id = req.params.id
        const result = await knex('companies').where({ 'id': id })
        if (result.length > 0) {
            res.status(200)
            return res.json(result)
        } else {
            res.status(404)
            return res.json({ err: 'Registro não encontrado' })
        }
    },

    async postCompanie(req: any, res: any) {
        const { razao_social, cnpj } = req.body
        const isValid = validateData.validateCNPJ(cnpj)
        if (isValid) {
            let result = await knex('companies').where({ 'cnpj': cnpj })
            if (result.length > 0) {
                res.status(400)
                res.json({ err: 'CNPJ já está cadastrado na base de dados!' })
            } else {
                await knex('companies').insert({
                    razao_social,
                    cnpj
                })
                result = await knex('companies').where({ 'cnpj': cnpj })
                if (result) {
                    res.status(200)
                    return res.json(result)
                } else {
                    res.status(500)
                    return res.json({ err: 'Falha ao inserir registro' })
                }
            }
        } else {
            res.status(400)
            res.json({ err: 'Formato dos dados inválidos!' })
        }
    },

    async deleteCompanie(req: any, res: any) {
        const id = req.params.id
        let result = await knex('companies').where({ 'id': id })
        if (result.length > 0) {
            await knex('companies').delete().where({ 'id': id })
            result = await knex('companies').where({ 'id': id })
            if (result.length > 0) {
                res.status(500)
                return res.json({ err: 'Falha ao deletar registro' })
            } else {
                res.status(200)
                return res.json({ msg: 'Registro deletado com sucesso!' })
            }
        } else {
            res.status(404)
            return res.json({ err: 'Registro não encontrado' })
        }
    },

    async putCompanie(req: any, res: any) {
        const id = req.params.id
        const { razao_social, cnpj } = req.body
        const isValid = validateData.validateCNPJ(cnpj)
        if (isValid) {
            let result = await knex('companies').where({ 'id': id })
            if (result.length > 0) {
                result = await knex('companies').where({ 'cnpj': cnpj })
                if (result.length > 0) {
                    res.status(400)
                    res.json({ err: 'CNPJ já está cadastrado na base de dados!' })
                } else {
                    await knex('companies').where({ 'id': id }).update({ 'razao_social': razao_social, 'cnpj': cnpj })
                    result = await knex('companies').where({ 'cnpj': cnpj })
                    if (result.length > 0) {
                        res.status(200)
                        return res.json(result)
                    } else {
                        res.status(500)
                        return res.json({ err: 'Falha ao alterar registro' })
                    }
                }
            } else {
                res.status(404)
                return res.json({ err: 'Registro não encontrado' })
            }
        } else {
            res.status(400)
            res.json({ err: 'Formato dos dados inválidos!' })
        }
    }
}