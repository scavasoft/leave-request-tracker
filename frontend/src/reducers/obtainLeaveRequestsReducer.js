import obtainDataAPI from '../api/leaveRequestAPI';

const LOADLEAVES_REQUEST = 'LOADLEAVES_REQUEST';
const LOADLEAVES_SUCCESS = 'LOADLEAVES_SUCCESS';
const LOADLEAVES_FAILED = 'LOADLEAVES_FAILED';

const initialState = {
    isLoading: true,
    success: [],
    errors: {},
}

export default (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case LOADLEAVES_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case LOADLEAVES_SUCCESS:
            return {
                ...state,
                success: payload,
                errors: {},
                isLoading: false,
            }
        case LOADLEAVES_FAILED:
            return {
                ...state,
                success: [],
                errors: payload,
                isLoading: false,
            }
        default:
            return state;
    }
}

export const obtainApprovedRequests = () => dispatch => {
    dispatch({
        type: LOADLEAVES_REQUEST,
    })
    obtainDataAPI.obtainApprovedRequests()
        .then(res => {
            const { data } = res;
            dispatch({
                type: LOADLEAVES_SUCCESS,
                payload: data,
            })
        })
        .catch(err => {
            const { errors } = err.response.data;
            dispatch({
                type: LOADLEAVES_FAILED,
                payload: errors,
            })
        })
}