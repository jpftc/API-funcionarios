const express = require('express')
const router = express.Router()
const adminAuth = require('../middlewares/adminAuth')

const CompaniesController = require('../controllers/CompaniesController')
const EmployeesController = require('../controllers/EmployeesController')

router.get('/companies', adminAuth.adminAuth, CompaniesController.getCompanies)
router.get('/companie/:id', adminAuth.adminAuth, CompaniesController.getCompanie)
router.post('/companie', adminAuth.adminAuth, CompaniesController.postCompanie)
router.delete('/companie/:id', adminAuth.adminAuth, CompaniesController.deleteCompanie)
router.put('/companie/:id', adminAuth.adminAuth, CompaniesController.putCompanie)

router.get('/employees', adminAuth.adminAuth, EmployeesController.getEmployees)
router.get('/employee/:id', adminAuth.adminAuth, EmployeesController.getEmployee)
router.post('/employee', adminAuth.adminAuth, EmployeesController.postEmployee)

export default router