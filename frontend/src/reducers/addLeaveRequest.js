import LeaveRequestAPI from '../api/leaveRequestAPI';

const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_FAILED = 'REQUEST_FAILED';

const initialState = {
  userLeaveRequest: { },
  requestError: { },
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
                registerError: payload,
            };
        default: return state;
    }
}

export const attemptLeaveRequest = (data) => dispatch => {
    LeaveRequestAPI.addNewRequest(data).then(res => {
           console.log(res);

           if(data.error) {
               dispatch({
                   type: REQUEST_FAILED,
                   payload: data.error,
               });
           }else {
               dispatch({
                   type: REQUEST_SUCCESS,
                   payload: data,
               })
           }

        });
}