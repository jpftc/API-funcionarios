import express from 'express'
const app = express()

import routes from '../src/routes/routes'

app.use('/', routes)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})