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
const UserViewModel = require('../models/viewmodels/user.view.model');
const User = require('../domain/entities/user.entity');
const bcrypt = require('bcrypt');

//Initialization
const userRepository = new UserRepository;
const userService = new UserService(userRepository);

//user authenticated login
exports.auth = (req, res) => {
    const authBindingModel = new AuthBindingModel({
        username: req.body.username,
        password: req.body.password,
    });

    if (authBindingModel.username.trim().length <= 0 || authBindingModel.password.trim().length <= 0) {
        res.status(400).send({
            error: 'Username or/and password is empty !'
        });
        return;
    }

    userService.findByUsername(authBindingModel.username, (err, callback) => {
        if (err) {
            res.status(500).send({
                error: 'Database error, try again later..' || err.message
            });
            return;
        }

        //working with alg: HS256
        const currentUser = callback;
        if (currentUser === undefined) {
            res.status(404).send({
                error: 'Invalid credentials !'
            });
            return;
        }
        bcrypt.compare(authBindingModel.password, currentUser.password, (err, callback) => {
            if (callback === false) {
                res.status(404).send({
                    error: 'Invalid credentials !'
                })
                return;
            }

            //If has an user which we are looking for
            if (currentUser !== undefined) {
                //Find role by id
                userService.findRoleByAuthority('USER', (err, callback) => {
                    if (err) {
                        res.status(403).send({
                            error: 'Forbidden'
                        });
                        return;
                    }

                    const role = new Role({
                      id: callback.id,
                      authority: callback.authority,
                    })
                    jwtToken.sign({ username: currentUser.username, role: role.authority }, Config.SECRET_TOKEN, Config.EXPIRES_IN, (err, token) => {
                        res.status(200).send({
                            token: token
                        });
                    });
                });
            } else {
                res.status(404).send({
                    error: 'Such a user does not exist'
                });
            }
        });
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

    const registerBindingModel = new RegisterBindingModel({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });

    userService.findByUsernameAndEmail(registerBindingModel.username, registerBindingModel.email, (err, callback) => {
        if (err) {
            res.status(500).send({
                error: 'Find by username error, try again later !'
            });
        } else {
            if (callback !== undefined) {
                res.status(403).send({
                    error: 'User already exists with this email or username !'
                });
                return;
            }

            userService.findRoleByAuthority(ROLE.USER, (err, callback) => {
                if (err) {
                    res.status(500).send({
                        error: 'Database problem, try again later !'
                    });
                    return;
                }
                //Check if role exists in the database
                let role = new Role(callback);

                if (role === undefined) {
                    res.status(403).send({
                        error: 'This role doesn\'t exists in our database !'
                    });
                    return;
                }

                userService.validation(registerBindingModel, callback => {
                    if (callback.size > 0) {
                        const errors = Object.fromEntries(callback);

                        //Send errors in json array
                        res.status(402).send({ errors });
                    } else {
                        //Hash the user password with BCrypt
                        const saltRounds = 12;
                        bcrypt.hash(registerBindingModel.password, saltRounds, (err, hash) => {
                            userService.insert(new UserEntity({
                                email: registerBindingModel.email,
                                username: registerBindingModel.username,
                                password: hash,
                                role: role,
                            })
                            );
                        });

                        res.status(200).send({
                            success: 'Your information was successfully saved !'
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
                error: 'Find by id error, try again later '
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
                error: 'Database problem, try again later '
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
                error: 'Database problem, try again later '
            });
        }

        res.status(200).send({
            success: 'User with id = ' + userViewModel.id + ' is successfully removed '
        });
    });
}
//by username
exports.findByUsername = (req, res) => {
    const username = req.query['username'];
    if (username === undefined) {
        res.send(404);
        return;
    }
    userService.findByUsername(username, (err, callback) => {
        if (err) {
            res.status(500).send({
                error: 'Find by username error, try again later '
            });
            return;
        }
        res.status(200).send({
            ...callback
        });
    });
}

//Check jwt and return user information on the client
exports.getUserByToken = (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];

    const username = jwtToken.decode(token).username;
    userService.findByUsername(username, (err, callback) => {
        if (err) {
            res.status(500).send({
                error: 'Find by username error, try again later ' || err.message
            });
            return;
        }
        const resultUser = callback;

        userService.findRoleById(callback.role_id, (err, callback) => {
            if (err) {
                res.status(500).send({
                    error: 'Database problem, try again later '
                });
                return;
            }
            //Check if role exists in the database
            let role = new Role(callback);
            let user = new User({
                id: resultUser.id,
                email: resultUser.email,
                username: resultUser.username,
                password: resultUser.password,
                role: role,
            });

            res.status(200).send(UserViewModel.toViewModel(user));
        });
    });
}