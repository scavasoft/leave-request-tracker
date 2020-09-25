module.exports = class UserLeave {
    constructor(userLeave) {
        this.reason = userLeave.reason;
        this.type = userLeave.type;
        this.name = userLeave.name;
        this.startDate = userLeave.startDate;
        this.endDate = userLeave.endDate;
    }
}