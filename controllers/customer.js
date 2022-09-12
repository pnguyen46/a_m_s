const customer = require('../models/Customer');
module.exports = {
    getIndex:async (req,res,next) => {
        try {
            return res.render('customer',{title:'Customer'});
        } catch (error) {
            return next(error);
        }
    }
};