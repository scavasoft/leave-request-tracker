module.exports = class UserViewModel {
    constructor() {
        this.email = '';
        this.username = '';
        this.authority = '';
    }

    static toViewModel(user){
        this.userViewModel = new UserViewModel();
        this.userViewModel.email = user.email;
        this.userViewModel.username = user.username;
        this.userViewModel.authority = user.role.authority;

        return this.userViewModel;
    }
}