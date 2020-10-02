const UserEntity = require('../domain/entities/user.entity');
const DeleteViewModel = require('../models/viewmodels/delete.view.model');
const UserService = require('../services/user.service');
const AuthBindingModel = require('../models/bindingmodels/auth.binding.model');
const jwt = require('jsonwebtoken');

//Initialization services
const userService = new UserService;

exports.auth = (req, res) => {
    const authBindingModel = new AuthBindingModel({
        username: req.body.username,
        password: req.body.password,
    });

    if (authBindingModel.username === 'undefined' || authBindingModel.password === 'undefined') {
        res.send(404);
        return;
    }

    userService.findUserByNameAndPassword(authBindingModel.username, authBindingModel.password,
        (err, callback) => {
            if (err) {
                res.status(500).send({
                    error: 'Find by username or password error, try again later ' || err.message
                });
                return;
            }

            jwt.sign({authBindingModel}, 'secretkey', {expiresIn: '24h'}, (err, token) => {
                res.status(200).send({
                    token: token
                });
            });
            // res.status(200).send({
            //     ...callback
            // });
        });

}

exports.insert = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: 'Body content cannot be empty!'
        });
        return;
    }

    const user = new UserEntity({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    userService.validation(user, callback => {
        if (callback.size > 0) {
            const errors = Object.fromEntries(callback);
            res.send({
                errors
            });
            return;
        }
    });

    userService.add(user);
    res.send({
        success: 'Your information was saved successfully'
    });
}

exports.findById = (req, res) => {
    const id = req.query['id'];
    if (id === undefined) {
        res.send(404);
        return;
    }
    userService.findById(id, (err, callback) => {
        if (err) {
            res.status(500).send({
                error: 'Find by id error, try again later ' || err.message
            });
            return;
        }
        res.status(200).send({
            ...callback
        });
    });
}

exports.findAllUsers = (req, res) => {
    userService.findAllUsers((err, callback) => {
        if (err) {
            res.status(500).send({
                error: 'Database problem, try again later ' || err.message
            });
            return;
        }
        res.send(callback);
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

    userService.delete(userViewModel.id, (err) => {
        console.log(err)
        if (err) {
            res.status(500).send({
                error: 'Database problem, try again later ' || err
            });
        }

        res.status(200).send({
            success: 'User with id = ' + userViewModel.id + ' is successfully removed '
        });
    });
}

