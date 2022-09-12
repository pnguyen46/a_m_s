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
    },
    repair: {
        type:String,
    },
    fav_tech: {
        type: String,
    },
    identifier:{
        type:String,
        default: 'customer'
    }
});
  
module.exports = mongoose.model('Customer', CustomerSchema,'customer');
