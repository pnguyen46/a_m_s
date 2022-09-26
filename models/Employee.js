const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    phone_number: {
        type:Number,
        required:true
    },
    joined_date: {
        type:String,
        required:true,
    },
    repair: {
        type:Array,
    },
    DOB: {
        type: String,
        required:true
    },
    specialty:{
        type:String,
    },
    class:{
        type:String,
        reuired:true,
        default:'Apprentice'
    },
    status:{
        type:String,
        required:true,
        default:'Active'
    },
    currentTickets:{
        type:Array,
        default:[]
    }
});
  
module.exports = mongoose.model('Employee', EmployeeSchema,'employee');
