const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    repairType:{
        type:String,
        required:true
    },
    hour:{
        type:String,
        required:true
    },
    parts:{
        type:Array
    },
    cost:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    technician:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});
  
module.exports = mongoose.model('Ticket', TicketSchema,'ticket');
