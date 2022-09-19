const ticket = require('../models/Ticket');
const customer = require('../models/Customer');
module.exports = {
    getIndex: async (req,res,next) => {
       res.render('registration',{title:'Customer Registration & Ticket Creation'});
    }
}