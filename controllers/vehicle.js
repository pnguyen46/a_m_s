const vehicle = require('../models/Vehicle');
module.exports = {
    deleteVehicle: async (req,res,next) => {
        try {
            await vehicle.findByIdAndDelete(req.params.vehicleId);
            res.redirect(`/customer/${req.params.customerId}`);
        } catch (error) {
            return next(error);
        }
    }
}