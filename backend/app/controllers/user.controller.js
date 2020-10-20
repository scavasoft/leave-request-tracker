const UserEntity = require('../domain/entities/user.entity');
const RegisterBindingModel = require('../models/bindingmodels/register.binding.model');
const Role = require('../domain/entities/role.entity');
const DeleteViewModel = require('../models/viewmodels/delete.view.model');
const UserService = require('../services/user.service');
const AuthBindingModel = require('../models/bindingmodels/auth.binding.model');
const jwtToken = require('jsonwebtoken');
const Config = require('../config/config');
const { ROLE } = require("../config/config");
const UserRepository = require('../repository/user.repository');

//Initialization
const userRepository = new UserRepository;
const userService = new UserService(userRepository);

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
            const currentUser = callback;
            if(callback !== 'undefined' ) {
                //Find role by id
                userService.findRoleById(currentUser.role_id, (err, callback) => {
                    if(err) {
                        res.status(403).send({
                            error: 'Forbidden'
                        });
                        return;
                    }

                    const role = callback; //An authority of the user
                    jwtToken.sign({username: currentUser.username, role: role.authority}, Config.SECRET_TOKEN, Config.EXPIRES_IN, (err, token) => {
                        res.status(200).send({
                            token: token
                        });
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
            errors: {
                body: 'Body content cannot be empty!'
            },
        });
        return;
    }

    const registerBindingModel = new RegisterBindingModel({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });

    userService.findByUsernameAndEmail(registerBindingModel.username, registerBindingModel.email, (err, callback) => {
        if (err) {
            res.status(500).send({
                errors: {
                    databaseError: 'Find by username error, try again later '
                },
            });
        }else {
            if(callback !== undefined) {
                res.status(403).send({
                    errors: {
                        user: 'User already exists with this email or username '
                    },
                });
                return;
            }

            userService.findRoleByAuthority(ROLE.USER, (err, callback) => {
                if (err) {
                    res.status(500).send({
                        errors: {
                            databaseError: 'Database problem, try again later '
                        },
                    });
                    return;
                }
                //Check if role exists in the database
                let role = new Role(callback);
                if(role === undefined || typeof role === undefined) {
                    res.send({ errors: {
                        role: 'This role doesn\'t exists in our database '
                        }
                    });
                    return;
                }

                userService.validation(registerBindingModel, callback => {
                    if (callback.size > 0) {
                        const errors = Object.fromEntries(callback);

                        //Send errors in json array
                        res.status(402).send({errors});
                    }else {
                        userService.insert(new UserEntity({
                                email: registerBindingModel.email,
                                username: registerBindingModel.username,
                                password: registerBindingModel.password,
                                role: role,
                            })
                        );

                        res.status(200).send({
                            success: 'Your information was saved successfully'
                        });
                    }
                });
            });
        }
    });
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