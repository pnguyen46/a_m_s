const customer = require('../models/Customer');
const vehicle = require('../models/Vehicle');
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
            const vehicles = await vehicle.find({customerId:req.params.id});
            res.json({item,vehicles});
        } catch (error) {
            return next(error);
        }
    }
    ,
    addCustomer:async (req,res,next) => {
        try {
            const vehicleArr = req.body.vehicle;
            const formatVehicleArr = [];
            let currIndx = 0;
            for(let i = 1; i <= vehicleArr.length;i++){
                if(i % 6 === 0){
                    formatVehicleArr.push(vehicleArr.slice(currIndx,i));
                    currIndx = i;
                }
            }
            const nCustomer = await customer.create({
                name:req.body.customerName,
                address:req.body.customerAddr,
                phone_number:req.body.customerPhone,
                repair:req.body.customerRepair,
                fav_tech:req.body.customerTech,
                joined_date:req.body.joinedDate,
            })
            
            formatVehicleArr.forEach(async item => {
                await vehicle.create({
                vehicleYear: item[0],
                vehicleMake: item[1],
                vehicleModel:item[2],
                vehicleEngine: item[3],
                vehicleMileage: item[4],
                vehicleVIN:item[5],
                customerId:nCustomer._id
                })
            })

            res.redirect('/customer');
        } catch (error) {
            return next(error);
        }
    },
    editCustomer:async (req,res,next) => {
        try {
            await customer.findOneAndUpdate({_id:req.params.id},{
                name:req.body.customerName,
                address: req.body.customerAddr,
                phone_number: req.body.customerPhone,
                repair:req.body.customerRepair,
                fav_tech:req.body.customerTech
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