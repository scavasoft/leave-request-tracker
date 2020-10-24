module.exports = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    insert(user) {
        this.userRepository.insert(user);
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

    //Find by username
    findByUsername(username, callback) {
        this.userRepository.findByUsername(username, callback);
    }

    //Find by username and email
    findByUsernameAndEmail(username, email, callback) {
        this.userRepository.findByUsernameOrEmail(username, email, callback);
    }

    findRoleByAuthority(authority, callback) {
        this.userRepository.findRoleByAuthority(authority, callback);
    }

    findRoleById(roleId, callback) {
        this.userRepository.findRoleById(roleId, callback);
    }

    /***
     * Validate all properties(fields)
     * @param object
     * @param callback
     */
    validation = (object, callback) => {
        let errors = new Map();

        if (object.email.trim().length <= 0 || object.email.trim().length >= 30) {
            errors.set('email', 'email field must not be empty and less than 30 symbols');
        }else {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!pattern.test(object.email))
                errors.set('email', 'This email address is not valid');
        }

        if (object.username.trim().length <= 0 || object.username.trim().length >= 20) { // custom length VARCHAR(20)
            errors.set('username', 'username field must not be empty and less than 20 symbols');
        }

        if (object.password.trim().length < 8 || object.password.trim().length === 0) {
            errors.set('password', 'password field can not be empty or less than 8 chars');
        } else {
            if (object.password !== object.confirmPassword) {
                errors.set('password', 'password and confirmPassword do not match');
            }
        }

        callback(errors, null);
    }


}