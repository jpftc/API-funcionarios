module.exports = {
    validateCPF(cpf: string) {
        if (!cpf.match(/\d\d\d.\d\d\d.\d\d\d-\d\d/g)) {
            return false
        } else {
            return true
        }
    },

    validateCNPJ(cnpj: string) {
        if (!cnpj.match(/\d\d.\d\d\d.\d\d\d\/\d\d\d\d-\d\d/g)) {
            return false
        } else {
            return true
        }
    }
}