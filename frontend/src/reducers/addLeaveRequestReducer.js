import LeaveRequestAPI from '../api/leaveRequestAPI';

//Actions
const LOADING = 'LOADING';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_FAILED = 'REQUEST_FAILED';

const initialState = {
    requestErrors: { },
    success: '',
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case REQUEST_SUCCESS:
            return {
                ...state,
                success: payload.success,
                requestErrors: {},
                isLoading: false,
            }
        case REQUEST_FAILED:
            return {
                ...state,
                requestErrors: payload,
                success: '',
                isLoading: false,
            };
        default: return state;
    }
}

export const createLeaveRequest = (data) => dispatch => {
    dispatch({type: LOADING})

    LeaveRequestAPI.addNewRequest(data)
        .then(res => {
            const { data } = res;

            dispatch({
                type: REQUEST_SUCCESS,
                payload: data,
            });
        })
        .catch(err => {
            const { errors } = err.response.data;
            let res = errors;
            if(errors === undefined)
                res = err.response.data;
            dispatch({
                type: REQUEST_FAILED,
                payload: res,
            });
        });
}