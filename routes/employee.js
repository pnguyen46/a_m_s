const { Router } = require("express");
const router = Router();
const employeeController = require('../controllers/employee');

router.get('/',employeeController.getIndex);
router.get('/history/:id',employeeController.empRepairHis)
router.get('/edit/:id',employeeController.updateEmployee)
router.get('/register',employeeController.registerEmployee)
router.get('/:id',employeeController.getEmployee);
router.post('/',employeeController.addEmployee);
router.put('/editItem/:id',employeeController.editEmployee);
router.delete('/deleteItem/:id',employeeController.deleteEmployee);

module.exports = router;