const { Router } = require("express");
const router = Router();
const customerController = require('../controllers/customer');

router.get('/',customerController.getIndex);
router.get('/register',customerController.registerCustomer)
router.get('/edit/:id',customerController.editCustomer);
router.get('/:id',customerController.getCustomer);
router.post('/',customerController.addCustomer);
router.put('/editItem/:id',customerController.updateCustomer);
router.delete('/deleteItem/:id',customerController.deleteCustomer);


module.exports = router;