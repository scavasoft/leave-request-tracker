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
            success: 'Your information was successfully saved !'
        });
    });
}

exports.update = (req, resp) => {
    if (Object.keys(req.body).length === 0) {
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
            success: 'Your information was successfully updated !'
        });
    });
}

exports.findById = (req, res) => {
    const id = req.query['id'];
    if (!id) {
        res.status(404).send({
            error: "User not found !",
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

        if (req.query.filter !== undefined && req.query.filterName !== undefined) {
            let isFilter = req.query.filter; // String
            if (isFilter === 'true') {
                const filterName = req.query.filterName;

                const filteredArrayByName = callback.filter((userLeave) => {
                    return userLeave.name.toLowerCase().includes(filterName.toString().toLowerCase());
                });

                res.send(filteredArrayByName);
            } else {
                res.send(callback);
            }
        } else {
            res.send(callback);
        }
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
            success: 'User leave with id = ' + userViewModel.id + ' has been successfully removed !'
        });
    });

}

exports.pagination = (req, res) => {

    let page, size;
    if (req.query !== undefined && req.query.page !== undefined && req.query.size !== undefined) {
        page = parseInt(req.query.page);
        size = parseInt(req.query.size);
    } else {
        // setting new values if not declared for first default page setting size = 10
        page = 1;
        size = 10;
    }

    const startIndex = (page - 1) * size;
    const endIndex = page * size;
    const results = {}

    userLeaveService.findAll((err, callback) => {
        if (err) {
            res.status(500).send({ error: 'DB problem, try again later' });
            return;
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                size: size,
            }
        }

        results.results = callback.slice(startIndex, endIndex);

        const allLeaves = callback.length;

        if (endIndex < allLeaves) {
            results.next = {
                page: page + 1,
                size: size,
            }
        }
        res.send(results);
    });
}