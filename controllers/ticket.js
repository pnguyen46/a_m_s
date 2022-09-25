const ticket = require('../models/Ticket');
const employee = require('../models/Employee');
const vehicle = require('../models/Vehicle');
const customer = require('../models/Customer');
const status = [
    'In progress',
    'Delay',
    'Terminate',
    'Complete'
];

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
            res.render('tickets',{title:'Ticket',tickets,employees,status});
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
            let historyFlag = false;
            if(req.params.custId !== 'ticket'){
                historyFlag = true;
            }else{
                historyFlag = false;
            }
            res.render('view/ticket',{title:"View Ticket",employees,vehicles,objTic,ticCustomer,parts,status,historyFlag});
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

            await employee.findByIdAndUpdate(req.body.repairTech,{
                $push:{repair:repairTicket._id}
            });

            await customer.findByIdAndUpdate(nCustomer._id,{
                $push:{repair:repairTicket._id}
            });

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
            // console.log(req.body)
            await ticket.findOneAndUpdate({_id:req.params.id,userId:req.user._id},{
                repairType:req.body.repairType,
                hour:req.body.repairHours,
                cost:req.body.repairCost,
                date:req.body.repairDate,
                technician:req.body.repairTech,
                status:req.body.repairStatus,
                parts:req.body.repairParts
            });

            await customer.findByIdAndUpdate(req.body.customerId,{
                name:req.body.customerName,
                address:req.body.customerAddr,
                phone_number:req.body.customerPhone,
            });

            const formatVehicleArr = [];
            const upVehicle = req.body.vehicle;
            let currIndx = 0;
            for(let i = 1; i <= upVehicle.length;i++){
                if(i % 7 === 0){
                    formatVehicleArr.push(upVehicle.slice(currIndx,i));
                    currIndx = i;
                }
            }
            formatVehicleArr.forEach(async upVehicle => {
                await vehicle.findByIdAndUpdate(upVehicle[0],{
                    vehicleYear: upVehicle[1],
                    vehicleMake: upVehicle[2],
                    vehicleModel:upVehicle[3],
                    vehicleEngine: upVehicle[4],
                    vehicleMileage: upVehicle[5],
                    vehicleVIN:upVehicle[6],
                });
            });
            console.log('Item Updated!');
            res.redirect('/ticket');
        } catch (error) {
            return next(error);
        }
    },
    deleteTicket: async (req,res,next) => {
        try {
            await ticket.findOneAndDelete({_id:req.params.id,userId:req.user._id});
            console.log('Ticket Deleted');
            res.redirect('/ticket');
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

            await customer.findByIdAndUpdate(req.params.id,{
                $push:{repair: repairTicket._id}
            });

            await employee.findByIdAndUpdate(req.body.repairTech,{
                $push:{repair:repairTicket._id}
            });

            if(Array.isArray(req.body.vehicles)){
                const vehicles = req.body.vehicles;
                vehicles.forEach(async vehicle => {
                    await ticket.findByIdAndUpdate(repairTicket._id,{
                        $push:{vehicles: vehicle}
                    });
                });
            }else{
                await ticket.findByIdAndUpdate(repairTicket._id,{
                    $push:{vehicles: req.body.vehicles}
                });
            }
            console.log('Ticket Created!');
            res.redirect('/ticket');
        } catch (error) {
            return next(error);
        }
    },
    editTicket:async(req,res,next) => {
        try {
            const ticketId = req.params.id;
            const tickets = await ticket.findById(ticketId);
            const employees = await employee.find({});
            const ticCustomer = await customer.findById(tickets.customer);
            const vehicles = await vehicle.find({customerId:tickets.customer});
            let currIndx = 0;
            const parts = [];
            for(let i = 0; i <= tickets.parts.length;i++){
                if(i !== 0 && i % 2 === 0){
                    parts.push(tickets.parts.slice(currIndx,i));
                    currIndx = i;
               }
            }
            res.render('edit/ticket',{title:'Update Ticket',employees,tickets,ticketId,ticCustomer,vehicles,parts});
        } catch (error) {
            return next(error);
        }
    },
    updateTicStatus:async(req,res,next) => {
        try {
            const ticketId = req.params.id;
            await ticket.findByIdAndUpdate(ticketId,{
                status:req.body.status
            });
            console.log('Ticket Status Updated!');
            res.redirect('/ticket');
        } catch (error) {
            return next(error);
        }
    },closeTicket:async(req,res,next) => {
        try {
            const currTic = await ticket.findById(req.params.id);
            if(currTic.status === '3'){
                await ticket.findByIdAndUpdate(req.params.id,{
                    closed:true
                });
            }
            console.log('Ticket Closed');
            res.redirect('/ticket');
        } catch (error) {
            return next(error);
        }
    },
    closedTickets:async (req,res,next) => {
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
            let historyFlag = false;
            if(req.params.custId !== 'ticket'){
                historyFlag = true;
            }else{
                historyFlag = false;
            }
            res.render('view/closedTicket',{title:"View Closed Ticket",employees,vehicles,objTic,ticCustomer,parts,status,historyFlag});
        } catch (error) {
            return next(error);
        }
    },
    openTicket:async (req,res,next) => {
        try {
            const currTic = await ticket.findById(req.params.id);
            if(currTic.closed){
                await ticket.findByIdAndUpdate(req.params.id,{
                    closed:false,
                    status:'0'
                });
            }
            res.redirect('/ticket');
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