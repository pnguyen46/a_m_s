const { Router } = require("express");
const router = Router();
const ticketController = require('../controllers/ticket');

router.get('/',ticketController.getIndex);
router.get('/:id',ticketController.getTicket);
router.post('/',ticketController.postTicket);
router.put('/editItem/:id',ticketController.updateTicket);
router.delete('/deleteItem/:id',ticketController.deleteTicket);

module.exports = router;