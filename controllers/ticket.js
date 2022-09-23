const ticket = require('../models/Ticket');
const employee = require('../models/Employee');
const vehicle = require('../models/Vehicle');
const customer = require('../models/Customer');

module.exports = {
    getIndex:async function(req,res,next){
        try {
            const filteredArr = [];
            const tickets = await ticket.find({userId:req.user._id});
            const employees = await employee.find({});
            const parts = tickets.map(item => item.parts);
            parts.forEach(item => {
                filteredArr.push(module.exports.partListBuilder(item));
            })
            tickets.forEach((item,indx) => item['parts'] = filteredArr[indx]);
            res.render('tickets',{title:'Ticket',tickets,employees});
        } catch (error) {
            return next(error);
        }
    },
    getTicket:async (req,res,next) => {
        try {
            const vehicles = [];
            const reTicket = await ticket.find({_id:req.params.id,userId:req.user._id});
            const [tickVehicle] = reTicket.map(item => item.vehicles);
            tickVehicle.forEach(async item => {
                const result = await vehicle.findById(item);
                vehicles.push(result);
            });
            const [objTic] = reTicket;
            const employees = await employee.find({});
            const ticCustomer = await customer.findById(objTic.customer);
            let currIndx = 0;
            const parts = [];
            for(let i = 0; i <= objTic.parts.length;i++){
                if(i !== 0 && i % 2 === 0){
                    parts.push(objTic.parts.slice(currIndx,i));
                    currIndx = i;
               }
            }
            res.render('view/ticket',{title:"View Ticket",employees,vehicles,objTic,ticCustomer,parts});
        } catch (error) {
            return next(error);
        }
    },
    postTicket: async (req,res,next) => {
        try {
            // console.log(req.body)
            const nCustomer = await customer.create({
                name:req.body.customerName,
                address:req.body.customerAddr,
                phone_number:req.body.customerPhone,
                joined_date: undefined
            });

            const repairTicket = await ticket.create({
                userId:req.user._id,
                repairType:req.body.repairType,
                hour:req.body.repairHours,
                parts:req.body.repairParts,
                cost:req.body.repairCost,
                date:req.body.repairDate,
                technician:req.body.repairTech,
                customer:nCustomer._id
            })

            const repairVehicle = req.body.vehicle;
            const formatVehicleArr = [];
            let currIndx = 0;
            for(let i = 1; i <= repairVehicle.length;i++){
                if(i % 6 === 0){
                    formatVehicleArr.push(repairVehicle.slice(currIndx,i));
                    currIndx = i;
                }
            }
            formatVehicleArr.forEach(async item => {
                const neVehicle = await vehicle.create({
                    vehicleYear: item[0],
                    vehicleMake: item[1],
                    vehicleModel:item[2],
                    vehicleEngine: item[3],
                    vehicleMileage: item[4],
                    vehicleVIN:item[5],
                    customerId:nCustomer._id
                });
                await ticket.findByIdAndUpdate(repairTicket._id,{
                    $push:{vehicles:neVehicle._id}
                });
            });
            console.log('Ticket Created!');
            res.redirect('/ticket');
        } catch (error) {
            return next(error);
        }
    },
    updateTicket: async (req,res,next) => {
        try {
            await ticket.findOneAndUpdate({_id:req.params.id,userId:req.user._id},{
                repairType:req.body.repairType,
                hour:req.body.repairHours,
                cost:req.body.repairCost,
                date:req.body.repairDate,
                technician:req.body.repairTech,
                status:req.body.repairStatus,
                parts:req.body.repairParts
            });
            // await vehicle.findByIdAndUpdate()
            console.log('Item Updated!');
            res.redirect('/tickets');
        } catch (error) {
            return next(error);
        }
    },
    deleteTicket: async (req,res,next) => {
        try {
            await ticket.findOneAndDelete({_id:req.params.id,userId:req.user._id});
            console.log('Ticket Deleted');
            res.redirect('/tickets');
        } catch (error) {
            return next(error);
        }
    },
    register:async (req,res,next) => {
        try {
            const employees = await employee.find({});
            res.render('create/ticket',{title:'Create Ticket',employees});
        } catch (error) {
            return next(error);
        }
    },
    customerRegister:async (req,res,next) => {
        try {
            const customerId = req.params.id;
            const employees = await employee.find({});
            const vehicles = await vehicle.find({customerId});
            res.render('create/cusTicket',{title:'Create Ticket',employees,customerId,vehicles});
        } catch (error) {
            return next(error);
        }
    },
    postCusTicket:async (req,res,next) => {
        try {
            const repairTicket = await ticket.create({
                userId:req.user._id,
                repairType:req.body.repairType,
                hour:req.body.repairHours,
                parts:req.body.repairParts,
                cost:req.body.repairCost,
                date:req.body.repairDate,
                technician:req.body.repairTech,
                customer:req.params.id
            });
        } catch (error) {
            return next(error);
        }
    },
    partListBuilder:(arr) => {
        const filteredArr = [];
        let temp = undefined;
        while (arr.length > 0) {
            temp = [];
            for (let i = 0; i < 2; i++) {
                temp.push(arr.shift());
            }
            filteredArr.push(temp);
        }
        return filteredArr.map(item => item.join(' x '));
    }
}