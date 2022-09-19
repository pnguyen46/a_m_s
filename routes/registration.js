const { Router } = require("express");
const router = Router();
const registration = require('../controllers/registration');

router.get('/',registration.getIndex);

module.exports = router;