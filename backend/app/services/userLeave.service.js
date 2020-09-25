const type = require('../config/config');
const UserLeaveRepository = require('../repository/userLeave.repository');

module.exports = class UserLeaveService {
    constructor() {
        this.userLeaveRepository = new UserLeaveRepository;
    }

    add(userLeave){
        this.userLeaveRepository.insert(userLeave);
    }

    findById(id, result) {
        this.userLeaveRepository.findById(id, result);
    }

    findAll(result) {
        this.userLeaveRepository.findAll(result);
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
        if(object.reason.trim().length === 0) {
            errors.set('reason: ', 'Reason field cannot be empty');
        }

        if(object.type.trim().length === 0) {
            errors.set('type: ', 'Type field cannot be empty');
        }

        if(object.name.trim().length === 0) {
            errors.set('name: ', 'Name field cannot be empty');
        }

        if(object.startDate.trim().length === 0) {
            errors.set('startDate: ', 'StartDate field cannot be empty');
        }

        if(object.endDate.trim().length === 0) {
            errors.set('endDate: ', 'endDate field cannot be empty');
        }

        if(object.reason.trim().length >= 250) { // custom length TEXT(65535)
            errors.set('reason: ', 'Reason field cannot be larger than 250 symbols');
        }

        if(object.name.trim().length > 50) { // custom length VARCHAR(50)
            errors.set('name: ', 'Name field cannot be larger than 50 symbols');
        }

        //Check types with ours
        let obj = type.TYPE.find(o => o.NAME === object.type);
        if(obj === undefined || obj === null) {
            errors.set('type: ', 'This type is not contained in our database ');
        }

        //Parse dates to long and check them
        if(Date.parse(object.startDate) >= Date.parse(object.endDate)) {
            errors.set('dateError: ', 'Start date can\'t be larger than end date');
        }

        callback(errors, null);
    }
}