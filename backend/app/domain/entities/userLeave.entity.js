module.exports = class UserLeave {
    constructor(object) {
        this.reason = object.reason;
        this.type = object.type;
        this.name = object.name;
        this.startDate = object.startDate;
        this.endDate = object.endDate;
        this.userId = object.userId;
    }
}