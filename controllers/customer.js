const customer = require('../models/Customer');
module.exports = {
    getIndex:async (req,res,next) => {
        try {
            const customers = await customer.find({});
            return res.render('customer',{title:'Customer',customers});
        } catch (error) {
            return next(error);
        }
    },
    getCustomer: async (req,res,next) =>{
        try {
            const item = await customer.find({_id:req.params.id});
            res.json({item});
        } catch (error) {
            return next(error);
        }
    }
    ,
    addCustomer:async (req,res,next) => {
        try {
            const date = new Date().toDateString();
            await customer.create({name:req.body.customerName,address:req.body.customerAddr,phone_number:req.body.customerPhone,repair:req.body.customerRepair,fav_tech:req.body.customerTech,joined_date:date})
            res.redirect('/customer');
        } catch (error) {
            return next(error);
        }
    },
    editCustomer:async (req,res,next) => {
        try {
            await customer.findOneAndUpdate({_id:req.params.id},{
                name:req.body.editCustomerName,
                address: req.body.editCustomerAddr,
                phone_number: req.body.editCustomerPhone,
                fav_tech:req.body.editCustomerFavTech
            });
            console.log("Item Updated");
            res.redirect('/customer');
        } catch (error) {
            return next(error);
        }
    }
    ,
    deleteCustomer: async (req,res,next) => {
        try {
            await customer.findOneAndDelete({_id:req.params.id});
            console.log('Deleted Customer');
            res.redirect('/customer');
        } catch (error) {
            return next(error);
        }
    }
};