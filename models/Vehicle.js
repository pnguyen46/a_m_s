const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
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
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    }  
});
  
module.exports = mongoose.model('vehicle', vehicleSchema,'vehicles');