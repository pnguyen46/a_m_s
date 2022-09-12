const { Router } = require("express");
const router = Router();
const customerController = require('../controllers/customer');

router.get('/',customerController.getIndex);

module.exports = router;