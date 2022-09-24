const { Router } = require("express");
const router = Router();
const ticketController = require('../controllers/ticket');

router.get('/',ticketController.getIndex);
router.get('/register',ticketController.register);
router.get('/closedTicket/:id',ticketController.closedTickets);
router.get('/edit/:id',ticketController.editTicket)
router.get('/register/:id',ticketController.customerRegister);
router.get('/:id',ticketController.getTicket);
router.post('/',ticketController.postTicket);
router.post('/:id',ticketController.postCusTicket);
router.put('/openTicket/:id',ticketController.openTicket);
router.put('/closeTicket/:id',ticketController.closeTicket);
router.put('/editItem/:id',ticketController.updateTicket);
router.put('/:id',ticketController.updateTicStatus)
router.delete('/deleteItem/:id',ticketController.deleteTicket);

module.exports = router;