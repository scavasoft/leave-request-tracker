//basic setup in our router file inside folder
module.exports = app => {
    const userController = require('../controllers/user.controller');

    app.post('/user/login', userController.auth);

    app.post('/user/register', userController.insert);

    app.get('/user/session', userController.getUserByToken);

    app.get('/admin/getByUsername', userController.findByUsername);

    app.get('/admin/getAllUsers', userController.findAllUsers);

    app.post('/admin/deleteUser', userController.delete);

}