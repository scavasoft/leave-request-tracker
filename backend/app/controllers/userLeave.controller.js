const UserLeave = require('../domain/entities/userLeave.entity');
const DeleteViewModel = require('../models/viewmodels/delete.view.model');
const UserLeaveService = require('../services/userLeave.service');

//Init services
const userLeaveService = new UserLeaveService;

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
    });

    userLeaveService.validate(userLeave, callback => {
        if (callback.size > 0) {
            const errors = Object.fromEntries(callback);

            resp.status(200).send({
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
    if (!id) {
        res.status(404).send({
            error: "User not found",
        });
    }
    userLeaveService.findById(id, (err, callback) => {
        if (err) {
            res.status(500).send({
                error: 'Database problem, try again later '
            });
            return;
        }

        res.status(200).send({
            ...callback
        });
    });
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
                error: 'Database problem, try again later '
            });
        }

        res.status(200).send({
            success: 'User leave with id = ' + userViewModel.id + ' is successfully removed'
        });
    });

}


exports.findAll = (req, res) => {

    userLeaveService.findAll((err, callback) => {
        if (err) {
            res.status(500).send({
                error: 'Database problem, try again later '
            });
            return;
        }
        res.send(callback);
    });
}

exports.pagination = (req, res) => {

    let page, size;
    //check for query values
    if(req.query !== undefined && req.query.page !== undefined && req.query.size !== undefined){
        page = parseInt(req.query.page);
        size = parseInt(req.query.size);
    } else {
        // setting new values if not declared for first default page setting size = 10
        page = 1;
        size = 10;
    }
    //for slicing size
    const startIndex = (page - 1) * size;
    const endIndex = page * size;

    //store sliced data
    const results = {}

    userLeaveService.findAll((err, callback) => {
        if (err) {
            res.status(500).send({error: 'DB problem, try again later'});
            return;
        }

        //previous page condition
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                size: size,
            }
        }

        //slicing result in callback
        results.results = callback.slice(startIndex, endIndex);

        //taking the length of all the data
        const allLeaves = callback.length;

        //next page condition
        if (endIndex < allLeaves) {
            results.next = {
                page: page + 1,
                size: size,
            }
        }



        //sending all the result
        res.send(results);
    });
}