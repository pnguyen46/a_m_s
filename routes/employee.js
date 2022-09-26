const { Router } = require("express");
const router = Router();
const employeeController = require('../controllers/employee');

router.get('/',employeeController.getIndex);
router.get('/history/:id',employeeController.empRepairHis)
router.get('/edit/:employeeId/:id',employeeController.updateEmployee)
router.get('/register',employeeController.registerEmployee)
router.get('/:employeeId/:id',employeeController.getEmployee);
router.post('/',employeeController.addEmployee);
router.put('/editItem/:id',employeeController.editEmployee);
router.put('/:id',employeeController.updateEmployStatus);
router.delete('/deleteItem/:id',employeeController.deleteEmployee);

module.exports = router;