const type = require('../config/config');

module.exports = class UserLeaveService {
    constructor(userLeaveRepository) {
        this.userLeaveRepository = userLeaveRepository;
    }

    add(userLeave) {
        this.userLeaveRepository.insert(userLeave);
    }

    update(id, userLeaveName) {
        this.userLeaveRepository.update(id, userLeaveName);
    }

    findById(id, result) {
        this.userLeaveRepository.findById(id, result);
    }

    findAll(result) {
        this.userLeaveRepository.findAll(result);
    }

    obtainApprovedLeaves(callback) {
        this.userLeaveRepository.obtainApprovedLeaves(callback);
    }

    delete(id, result) {
        this.userLeaveRepository.delete(id, result);
    }

    /***
     * Validate all properties(fields)
     * @param object
     * @param callback
     */
    validate = (object, callback) => {
        let errors = new Map();
        if (object.reason.trim().length === 0) {
            errors.set('reason', 'Reason field cannot be empty');
        }

        if (object.type.trim().length === 0) {
            errors.set('type', 'Type field cannot be empty');
        }

        if (object.name.trim().length === 0) {
            errors.set('name', 'Name field cannot be empty');
        }

        if (object.startDate.trim().length === 0) {
            errors.set('startDate', 'StartDate field cannot be empty');
        }

        if (object.endDate.trim().length === 0) {
            errors.set('endDate', 'EndDate field cannot be empty');
        }

        //Parse dates to long and check them
        if (Date.parse(object.startDate) > Date.parse(object.endDate)) {
            errors.set('dateError', 'Start date can\'t be larger than end date');
        }

        if (object.reason.trim().length >= 250) { // custom length TEXT(65535)
            errors.set('reason', 'Reason field cannot be larger than 250 symbols');
        }

        if (object.name.trim().length > 50) { // custom length VARCHAR(50)
            errors.set('name', 'Name field cannot be larger than 50 symbols');
        }

        //Check types with ours
        let obj = type.TYPE.find(o => o.NAME === object.type);
        if (typeof obj === undefined || obj === null) {
            errors.set('type', 'This type is not contained in our database ');
        }

        callback(errors, null);
    }
}