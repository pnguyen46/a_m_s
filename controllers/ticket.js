const ticket = require('../models/Ticket');
const employee = require('../models/Employee');
const vehicle = require('../models/Vehicle');

module.exports = {
    getIndex:async function(req,res,next){
        try {
            const filteredArr = [];
            const tickets = await ticket.find({userId:req.user._id});
            // console.log(tickets);
            const employees = await employee.find({});
            const parts = tickets.map(item => item.parts);
            parts.forEach(item => {
                filteredArr.push(module.exports.partListBuilder(item));
            })
            tickets.forEach((item,indx) => item['parts'] = filteredArr[indx]);
            res.render('ticket',{title:'Ticket',tickets,employees});
        } catch (error) {
            return next(error);
        }
    },
    getTicket:async (req,res,next) => {
        try {
            const item = await ticket.find({_id:req.params.id,userId:req.user._id});
            console.log(item);
            res.json({item});
        } catch (error) {
            return next(error);
        }
    },
    postTicket: async (req,res,next) => {
        try {
            if(!req.body.repairStatus){
                req.body.repairStatus = undefined;
            }
            // console.log(req.body.repairParts);
            await ticket.create({
                userId:req.user._id,
                repairType:req.body.repairType,
                hour:req.body.repairHours,
                parts:req.body.repairParts,
                cost:req.body.repairCost,
                date:req.body.repairDate,
                technician:req.body.repairTech,
                status:req.body.repairStatus
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
            await vehicle.findByIdAndUpdate()
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