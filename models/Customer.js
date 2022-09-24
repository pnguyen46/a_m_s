const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
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
        default:() => {
            const date = new Date();
            joinDate = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
            return joinDate;
        }
    },
    repair: {
        type:Array,
        default:[]
    },
    fav_tech: {
        type: String,
        default:''
    },
});
  
module.exports = mongoose.model('Customer', CustomerSchema,'customer');
