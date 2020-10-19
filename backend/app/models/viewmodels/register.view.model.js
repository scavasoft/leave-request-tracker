module.exports = class RegisterViewModel{
    constructor() {
        this.email = '';
        this.username = '';
        this.password = '';
        this.authority = '';
    }

    static toViewModel(user){
        this.registerViewModel = new RegisterViewModel();
        this.registerViewModel.email = user.email;
        this.registerViewModel.username = user.username;
        this.registerViewModel.password = user.password;
        this.registerViewModel.authority = user.role.authority;
        return this.registerViewModel;
    }
}