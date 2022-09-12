const { Router } = require("express");
const router = Router();
const customerController = require('../controllers/customer');

router.get('/',customerController.getIndex);
router.post('/',customerController.addCustomer);
router.delete('/:id',customerController.deleteCustomer)

module.exports = router;