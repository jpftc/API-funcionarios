import express from 'express'
const app = express()

import routes from './controllers/CompaniesController'

app.use('/', routes)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})