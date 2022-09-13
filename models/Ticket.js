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
        type:Number,
        required:true
    },
    parts:{
        type:Array
    },
    cost:{
        type:Number,
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
        default:'In progress',
        required:true
    },
    closed: {
        type:Boolean,
        default: false
    }
});
  
module.exports = mongoose.model('Ticket', TicketSchema,'ticket');
