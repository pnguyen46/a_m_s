const ticket = require('../models/Ticket');
module.exports = {
    getIndex:async (req,res,next) => {
        try {
            const tickets = await ticket.find({userId:req.user._id});
            res.render('ticket',{title:'Ticket',tickets});
        } catch (error) {
            return next(error);
        }
    },
    getTicket:async (req,res,next) => {
        try {
            const item = await ticket.find({_id:req.params.id,userId:req.user._id});
            res.json({item});
        } catch (error) {
            return next(error);
        }
    },
    postTicket: async (req,res,next) => {
        try {
            await ticket.create({
                userId:req.user._id,
                repairType:req.body.repairType,
                hour:req.body.repairHours,
                parts:req.body.repairParts,
                cost:req.body.repairCost,
                date:undefined,
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
            
        } catch (error) {
            
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
    }
}