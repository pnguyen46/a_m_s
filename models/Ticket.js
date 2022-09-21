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
        type:String,
        required:true
    },
    technician:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Employee',
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
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    },
    vehicles:{
        type:Array,
        default:[]
    }
});
  
module.exports = mongoose.model('Ticket', TicketSchema,'ticket');
