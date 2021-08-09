const users = [{ id: 1, username: 'teste', password: 'teste123' }]

function authenticate({ username, password }: { username: string, password: string }) {
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
        const { password, ...userWithoutPassword } = user
        return userWithoutPassword
    }
}