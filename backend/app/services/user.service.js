const UserRepository = require('../repository/user.repository');

module.exports = class UserService {
    constructor() {
        this.userRepository = new UserRepository;
    }

    auth(username, password, callback) {
        this.userRepository.auth(username, password, callback);
    }

    insert(userLeave) {
        this.userRepository.insert(userLeave);
    }

    findById(id, result) {
        this.userRepository.findById(id, result);
    }

    findAllUsers(result) {
        this.userRepository.findAllUsers(result);
    }

    delete(id, result) {
        this.userRepository.delete(id, result);
    }
    //by username
    findOne(username,callback){
        this.userRepository.findOne(username,callback);
    }

    findRole(authority,callback){
        this.userRepository.findRole(authority,callback);
    }

    /***
     * Validate all properties(fields)
     * @param object
     * @param callback
     */
    validation = (object, callback) => {
        // let errors = new Map();
        //
        // if (object.email.trim().length === 0 || object.email.trim().length >= 20) { // custom length
        //     errors.set('email: ', 'email field must not be empty and less then 20 symbols');
        // }
        //
        // if (object.username.trim().length === 0 || object.username.trim().length >= 20) { // custom length VARCHAR(50)
        //     errors.set('username: ', 'username field must not be empty and less then 20 symbols');
        // }
        //
        // if (object.password.trim().length <= 7 || object.password.trim().length === 0) {
        //     errors.set('password: ', 'password field can not be empty or less then 8 chars!!!');
        // }
        //
        // callback(errors,null);

        // //Check types with ours
        // let obj = type.TYPE.find(o => o.NAME === object.type);
        // if(obj === undefined || obj === null) {
        //     errors.set('type: ', 'This type is not contained in our database ');
        // }
        //
        // //Parse dates to long and check them
        // if(Date.parse(object.startDate) >= Date.parse(object.endDate)) {
        //     errors.set('dateError: ', 'Start date can\'t be larger than end date');
        // }
        //
        // callback(errors, null);
    }


}