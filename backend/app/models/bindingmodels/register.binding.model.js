module.exports = class RegisterBindingModel{
    constructor(register) {
        this.email = register.email;
        this.username = register.username;
        this.password = register.password;
        this.confirmPassword = register.confirmPassword;
    }
}