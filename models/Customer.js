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
    vehicleYear: {
        type:String,
        required:true,
    },    
    vehicleMake: {
        type:String,
        required:true,
    },    
    vehicleModel: {
        type:String,
        required:true,
    },    
    vehicleEngine: {
        type:String,
        required:true,
    },    
    vehicleMileage: {
        type:String,
    },    
    vehicleVIN: {
        type:String,
    }    
});
  
module.exports = mongoose.model('Customer', CustomerSchema,'customer');
