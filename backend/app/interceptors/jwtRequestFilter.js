const jwt = require('jsonwebtoken');
const Config = require('../config/config');
const UserService = require('../services/user.service');
const UserRepository = require('../repository/user.repository');

//Initialization
const userRepository = new UserRepository;
const userService = new UserService(userRepository);

module.exports = class JwtRequestFilter {
    constructor(req, res, next) {
        const authorizationHeader = req.headers['authorization'];

        let username = null;
        let token = null;
        if (authorizationHeader !== null && authorizationHeader.startsWith('Bearer ')) {
            token = authorizationHeader.split(' ')[1];

            jwt.verify(token, Config.SECRET_TOKEN, (err, user) => {
                if (err) {
                    res.status(403).send({
                        error: 'Token is not valid or has expired !'
                    });
                    return;
                }
                username = user.username;

                userService.findByUsername(username, (err, callback) => {
                    if (err) {
                        res.status(500).send({
                            errors: {
                                databaseError: 'Database error, try again later'
                            },
                        })
                        return;
                    }

                    if (callback.username !== username) {
                        res.status(401).send({
                            errors: {
                                user: 'User with this name doesn\'t exist !'
                            },
                        });
                        return;
                    }

                    next();
                });
            })
        }
    }
}