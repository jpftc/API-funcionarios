import express from 'express'
const app = express()
const basicAuth = require('./helpers/basic-auth')

import routes from './controllers/CompaniesController'

app.use('/', routes)
app.use(basicAuth)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})