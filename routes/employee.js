const { Router } = require("express");
const router = Router();
const employeeController = require('../controllers/employee');

router.get('/',employeeController.getIndex);
router.get('/:id',);
router.post('/',employeeController.addEmployee);
router.put('/editItem/:id',);
router.delete('/deleteItem/:id',);

module.exports = router;