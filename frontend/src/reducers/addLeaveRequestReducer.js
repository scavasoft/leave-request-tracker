import LeaveRequestAPI from '../api/leaveRequestAPI';

const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_FAILED = 'REQUEST_FAILED';

const initialState = {
  userLeaveRequest: { },
  requestErrors: { },
};

//Actions
export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case REQUEST_SUCCESS:
            return {
                ...state,
                userLeaveRequest: payload,
            }
        case REQUEST_FAILED:
            return {
                ...state,
                requestErrors: payload,
            };
        default: return state;
    }
}

export const attemptLeaveRequest = (data) => dispatch => {
    LeaveRequestAPI.addNewRequest(data)
        .then(res => {
           const { data } = res;
           if(data.errors) {
               dispatch({
                   type: REQUEST_FAILED,
                   payload: data.errors,
               });
           }
           else {
               dispatch({
                   type: REQUEST_SUCCESS,
                   payload: data,
               })
           }
        });
}