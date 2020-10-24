module.exports = class UserViewModel {
    constructor() {
        this.id = null;
        this.email = '';
        this.username = '';
        this.authority = '';
    }

    static toViewModel(user){
        this.userViewModel = new UserViewModel();
        this.userViewModel.id = user.id;
        this.userViewModel.email = user.email;
        this.userViewModel.username = user.username;
        this.userViewModel.authority = user.role.authority;

        return this.userViewModel;
    }
}