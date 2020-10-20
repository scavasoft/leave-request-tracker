import LeaveRequestAPI from '../api/leaveRequestAPI';

const REQUEST_STARTING = 'REQUEST_STARTING';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_FAILED = 'REQUEST_FAILED';

const initialState = {
    userLeaveRequest: { },
    requestErrors: { },
    isLoading: false,
};

//Actions
export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case REQUEST_STARTING:
            return {
                ...state,
                isLoading: true,
            };
        case REQUEST_SUCCESS:
            return {
                ...state,
                userLeaveRequest: payload,
                isLoading: false,
            }
        case REQUEST_FAILED:
            return {
                ...state,
                requestErrors: payload,
                isLoading: false,
            };
        default: return state;
    }
}

export const createLeaveRequest = (data) => dispatch => {
    dispatch({type: REQUEST_STARTING})

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