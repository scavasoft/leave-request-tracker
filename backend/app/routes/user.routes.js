//basic setup in our router file inside folder
module.exports = app => {
    const userController = require('../controllers/user.controller');

    app.post('/user/login', userController.auth);

    app.post('/user/register', userController.insert);

    app.get('/user/getUserById', userController.findById);

    app.get('/admin/getAllUsers', userController.findAllUsers);

    app.post('/admin/deleteUser', userController.delete);

}