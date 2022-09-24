const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");

const inventoryRoutes = require('./inventory');
const customerRoutes = require('./customer');
const employeeRoutes = require('./employee');
const ticketRoutes = require('./ticket');
const vehicleRoutes = require('./vehicle');
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.use('/inventory', inventoryRoutes);
router.use('/customer', customerRoutes);
router.use('/employee', employeeRoutes);
router.use('/ticket',ticketRoutes);
router.use('/vehicle',vehicleRoutes);

module.exports = router;
