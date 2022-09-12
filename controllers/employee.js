const employee = require('../models/Employee');
module.exports = {
    getIndex: async (req,res,next) => {
        try {
            const employees = await employee.find({});
            res.render('employee',{title:'Employee',employees});
        } catch (error) {
            return next(error);
        }
    },
    addEmployee: async (req,res,next) => {
        try {
            const date = new Date().toDateString();
            await employee.create({
                name:req.body.employeeName,
                address:req.body.employeeAddr,
                phone_number:req.body.employeePhone,
                repair:req.body.employeeRepair,
                specialty:req.body.employeeSpecialty,
                class:req.body.employeeClass,
                status:req.body.employeeStatus,
                joined_date:date
            });
            return res.redirect('/employee');
        } catch (error) {
            return next(error);
        }
    }
}