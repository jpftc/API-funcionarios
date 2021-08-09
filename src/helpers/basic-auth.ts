const userService = require('../users/user.service')

async function basicAuth(req: any, res: any, next: any) {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic') === -1) {
        return res.status(403).json({ message: 'Header de Autorizacao nao encontrado' })
    }

    const base64Credentials = req.headers.authorization.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')
    const user = await userService.authenticate({ username, password })
    if (!user) {
        return res.status(403).json({ message: 'Usuario e/ou senha invalidos' })
    }

    req.user = user

    next();
}

module.exports = basicAuth