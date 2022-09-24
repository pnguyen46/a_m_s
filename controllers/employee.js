const employee = require('../models/Employee');
module.exports = {
    getIndex: async (req,res,next) => {
        try {
            const employees = await employee.find({});
            console.log(employees);
            res.render('employee',{title:'Employee',employees});
        } catch (error) {
            return next(error);
        }
    },
    getEmployee:async (req,res,next) => {
        try {
            const employ = await employee.findById({_id:req.params.id});
            console.log(employ);
            res.render('view/employee',{title:'View Employee',employ});
        } catch (error) {
            return next(error);
        }
    },
    addEmployee: async (req,res,next) => {
        try {
            console.log(req.body);
            // if(!req.body.employeeClass){
            //     req.body.employeeClass = undefined;
            // }

            await employee.create({
                name:req.body.employeeName,
                address:req.body.employeeAddr,
                phone_number:req.body.employeePhone,
                joined_date:req.body.employeeJDate,
                DOB:req.body.employeeDOB,
                specialty:req.body.employeeSpecialty,
                class:undefined,
                status:undefined
            });
            return res.redirect('/employee');
        } catch (error) {
            return next(error);
        }
    },
    editEmployee:async (req,res,next) => {
        try {
            await employee.findOneAndUpdate({_id:req.params.id},{
                name:req.body.employeeName,
                address:req.body.employeeAddr,
                phone_number:req.body.employeePhone,
                joined_date:req.body.employeeJDate,
                DOB:req.body.employeeDOB,
                specialty:req.body.employeeSpecialty,
                class:req.body.employeeClass,
                status:req.body.employeeStatus
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
    },
    registerEmployee: async (req,res,next) => {
        try {
            res.render('create/employee',{title:'Create Employee'});
        } catch (error) {
            return next(error);
        }
    },
    updateEmployee:async (req,res,next) => {
        try {
            // console.log(req.params.id)
            const employ = await employee.findById(req.params.id);
            res.render('edit/employee',{title:'Update Employee',employ});
        } catch (error) {
            return next(error);
        }
    }
}