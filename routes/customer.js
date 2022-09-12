const { Router } = require("express");
const router = Router();
const customerController = require('../controllers/customer');

router.get('/',customerController.getIndex);
router.get('/:id',customerController.getCustomer);
router.post('/',customerController.addCustomer);
router.put('/editItem/:id',customerController.editCustomer);
router.delete('/:id',customerController.deleteCustomer);

module.exports = router;