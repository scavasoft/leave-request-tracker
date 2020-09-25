const UserLeave = require('../domain/entities/userLeave.entity.js');
const DeleteViewModel = require('../models/viewmodels/delete.view.model');
const UserLeaveService = require('../services/userLeave.service');

//Init services
const userLeaveService = new UserLeaveService;

exports.insert = (req, resp) => {
    if(Object.keys(req.body).length === 0) {
        resp.status(400).send({
            error: 'Body content cannot be empty!'
        });
        return;
    }

    const userLeave = new UserLeave({
        reason: req.body.reason,
        type: req.body.type,
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    });

    userLeaveService.isValidate(userLeave, result => {
        if(result.size > 0) {
            const errors = Object.fromEntries(result);
            resp.send({
                errors
            });
            return;
        }

    });

    userLeaveService.add(userLeave);
    resp.send({
        success: 'Yours information was successfully saved'
    });
}

exports.findById = (req, res) => {
    const id = req.query['userLeaveId'];
    userLeaveService.findById(id, (err, result) => {
        if(err) {
            res.status(500).send({
               error: 'Database problem, try again later ' || err.message
            });
            return;
        }

        res.status(200).send({
            ...result
        });
    });
}

exports.findAll = (req,res) => {
    userLeaveService.findAll((err, result) => {
        if(err) {
                res.status(500).send({
                error: 'Database problem, try again later ' || err.message
            });
            return;
        }

        res.send(result);
    });
}

exports.delete = (req, res) => {
    if(Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: 'Body content cannot be empty!'
        });
        return;
    }

    const userViewModel = new DeleteViewModel({
        id: req.body.id,
    })

   userLeaveService.delete(userViewModel.id, (err) => {
       console.log(err)
       if(err) {
           res.status(500).send({
               error: 'Database problem, try again later ' || err
           });
       }

       res.status(200).send({
           success: 'User leave with id = ' + userViewModel.id + ' is successfully removed '
       });
   });



}

