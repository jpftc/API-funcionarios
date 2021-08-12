import express from 'express'
const app = express()

import companies from './controllers/CompaniesController'
import employees from './controllers/EmployeesController'

app.use(express.json())

app.use('/', companies)
app.use('/', employees)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})