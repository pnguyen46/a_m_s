const ticket = require('../models/Ticket');
module.exports = {
    getIndex:async function(req,res,next){
        try {
            const tickets = await ticket.find({userId:req.user._id});
            const [data] = tickets;
            const {parts} = data;
            const partlist = module.exports.partListBuilder(parts);
            tickets[0]['parts'] = partlist;
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
            if(!req.body.repairStatus){
                req.body.repairStatus = undefined;
            }
            console.log(req.body.repairParts);
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