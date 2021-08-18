import express from 'express'
const app = express()
import swaggerUi from 'swagger-ui-express'
const swaggerDocument = require('./swagger/swagger.json')

import routes from './routes/routes'

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())
app.use('/', routes)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})