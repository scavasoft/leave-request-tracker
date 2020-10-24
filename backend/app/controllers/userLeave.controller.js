const UserLeave = require('../domain/entities/userLeave.entity');
const DeleteViewModel = require('../models/viewmodels/delete.view.model');
const UserLeaveService = require('../services/userLeave.service');
const UserLeaveRepository = require('../repository/userLeave.repository');

//Initialization
const userLeaveRepository = new UserLeaveRepository;
const userLeaveService = new UserLeaveService(userLeaveRepository);

exports.insert = (req, resp) => {
    if (Object.keys(req.body).length === 0) {
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
        userId: req.body.userId,
    });

    userLeaveService.validate(userLeave, callback => {
        if (callback.size > 0) {
            const errors = Object.fromEntries(callback);

            resp.status(400).send({
                errors
            });
            return;
        }

        userLeaveService.add(userLeave);
        resp.send({
            success: 'Yours information was successfully saved'
        });
    });
}

exports.update = (req, resp) => {
    if(Object.keys(req.body).length === 0) {
        resp.status(400).send({
            error: 'Body content cannot be empty!'
        });
        return;
    }

    const id = req.body.id;
    const userLeave = new UserLeave({
        reason: req.body.reason,
        type: req.body.type,
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        userId: req.body.userId,
    });

    userLeaveService.validate(userLeave, callback => {
        if (callback.size > 0) {
            const errors = Object.fromEntries(callback);

            resp.status(400).send({
                errors
            });
            return;
        }

        userLeaveService.update(id, userLeave.name);
        resp.send({
            success: 'Yours information was successfully updated'
        });
    });
}

exports.findById = (req, res) => {
    const id = req.query['id'];
    if(!id){
        res.status(404).send({
            error: "User not found",
        });
    }
    userLeaveService.findById(id, (err, callback) => {
        if (err) {
            res.status(500).send({
                error: 'Database problem, try again later ' || err.message
            });
            return;
        }

        res.status(200).send({
            ...callback
        });
    });
}

exports.findAll = (req, res) => {
    userLeaveService.findAll((err, callback) => {
        if (err) {
            res.status(500).send({
                error: 'Database problem, try again later ' || err.message
            });
            return;
        }

        res.send(callback);
    });
}

exports.obtainApprovedLeaves = (req, res) => {
    userLeaveService.obtainApprovedLeaves((err, callback) => {
        if (err) {
            res.status(500).send({
                error: err.message
            })
            return;
        }
        res.send(callback);
    })

}

exports.delete = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: 'Body content cannot be empty!'
        });
        return;
    }

    const userViewModel = new DeleteViewModel({
        id: req.body.id,
    })

    userLeaveService.delete(userViewModel.id, (err) => {
        if (err) {
            res.status(500).send({
                error: 'Database problem, try again later ' || err
            });
        }

        res.status(200).send({
            success: 'User leave with id = ' + userViewModel.id + ' is successfully removed'
        });
    });

}

