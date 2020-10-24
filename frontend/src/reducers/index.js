import addLeaveRequestReducer from './addLeaveRequestReducer';
import calendarReducer from './calendarReducer';
import authReducer from './authReducer';
import obtainApprovedRequests from './obtainLeaveRequestsReducer';
import { combineReducers } from 'redux';

/***
 * This method combine all reducers
 * @type {Reducer<CombinedState<{addLeaveRequestReducer: ({requestError: {}, userLeaveRequest: *}|{requestError: {}, userLeaveRequest: {}, registerError: *}|{requestError: {}, userLeaveRequest: {}}), calendarReducer: ({error: {}, calendarDate: *}|{error: *, calendarDate: {}}|{error: {}, calendarDate: {}})}>>}
 */
const reducers = combineReducers({
    addLeaveRequestReducer,
    calendarReducer,
    authReducer,
    obtainApprovedRequests,
});

export default reducers;