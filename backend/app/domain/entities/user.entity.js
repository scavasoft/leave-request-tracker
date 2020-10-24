const Role = require('../entities/role.entity')
module.exports = class User {

    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.username = user.username;
        this.password = user.password;
        this.role = new Role(user.role);
    }
}