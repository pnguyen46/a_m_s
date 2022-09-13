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
    getEmployee:async (req,res,next) => {
        try {
            const item = await employee.find({_id:req.params.id});
            res.json({item});
        } catch (error) {
            return next(error);
        }
    },
    addEmployee: async (req,res,next) => {
        try {
            const date = new Date().toDateString();
            if(!req.body.employeeClass){
                req.body.employeeClass = undefined;
            }
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
    },
    editEmployee:async (req,res,next) => {
        try {
            await employee.findOneAndUpdate({_id:req.params.id},{
                name:req.body.editEmployeeName,
                address:req.body.editEmployeeAddr,
                phone_number:req.body.editEmployeePhone,
                repair:req.body.editEmployeeRepair,
                specialty:req.body.editEmployeeSpecialty,
                class:req.body.editEmployeeClass,
                status:req.body.editEmployeeStatus
            });
            console.log("Item Updated");
            res.redirect('/employee');
        } catch (error) {
            return next(error);
        }
    },
    deleteEmployee:async (req,res,next) => {
        try {
            await employee.findOneAndDelete({_id:req.params.id});
            console.log('Deleted Employee');
            res.redirect('/employee');
        } catch (error) {
            return next(error);
        }
    }
}