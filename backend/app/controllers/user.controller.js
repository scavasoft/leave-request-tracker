const UserEntity = require('../domain/entities/user.entity');
const RegisterBindingModel = require('../models/bindingmodels/register.binding.model');
const Role = require('../domain/entities/role.entity');
const DeleteViewModel = require('../models/viewmodels/delete.view.model');
const UserService = require('../services/user.service');
const AuthBindingModel = require('../models/bindingmodels/auth.binding.model');
const jwtToken = require('jsonwebtoken');
const Config = require('../config/config');
const RegisterViewModel = require('../models/viewmodels/register.view.model');


//Initialization services
const userService = new UserService;


//user authenticated login
exports.auth = (req, res) => {
    const authBindingModel = new AuthBindingModel({
        username: req.body.username,
        password: req.body.password,
    });

    userService.auth(authBindingModel.username,authBindingModel.password,
        (err, callback) => {
            if (err) {
                res.status(500).send({
                    error: 'Authentication error, try again later ' || err.message
                });
                return;
            }

            //working with alg: HS256
            if(typeof callback !== 'undefined' ) {
                jwtToken.sign({authBindingModel}, Config.SECRET_TOKEN, Config.EXPIRES_IN, (err, token) => {
                    res.status(200).send({
                        token: token
                    });
                });
            }else {
                res.status(404).send({
                    error: 'User is not exists'
                });
            }
        });
}

//user register
exports.insert = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: 'Body content cannot be empty!'
        });
        return;
    }

    let registerBindingModel = new RegisterBindingModel({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });

    let allUsers = null;
    userService.findAllUsers((err, callback) => {
        if (err) {
            res.status(500).send({
                error: 'Database problem, try again later ' || err.message
            });
            return;
        }
        allUsers = callback;
    });
    // console.log(allUsers)

    let role = null;
    if (allUsers === null){
        userService.findRole('admin', (err, callback) => {
            if (err) {
                res.status(500).send({
                    error: 'Database problem, try again later ' || err.message
                });
                return;
            }

            //TODO: init role through callback
            // console.log({...callback})
            role = new Role(
                callback
           );
        });
    }else {
        userService.findRole('user',(err, callback) => {
            if (err) {
                res.status(500).send({
                    error: 'Database problem, try again later ' || err.message
                });
                return;
            }

            role = callback;
        });
    }

    console.group('Role')
    console.log(role);
    console.groupEnd()


    //
    // userService.validation(user, callback => {
    //     if (callback.size > 0) {
    //         const errors = Object.fromEntries(callback);
    //         res.send({
    //             errors
    //         });
    //         return;
    //     }
    // });
    //
    // userService.insert(user);
    // res.send({
    //     success: 'Your information was saved successfully'
    // });
}

//find user by id
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

//find all users
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

//delete user
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
//by username
exports.findOne = (req, res) => {
    const username = req.query['username'];
    if (username === undefined) {
        res.send(404);
        return;
    }
    userService.findOne(username, (err, callback) => {
        if (err) {
            res.status(500).send({
                error: 'Find by username error, try again later ' || err.message
            });
            return;
        }
        res.status(200).send({
            ...callback
        });
    });
}