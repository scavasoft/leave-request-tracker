import authAPI from '../api/authAPI';

// Actions for Registration
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

// Actions for login
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const initialState = {
    isLoading: true,
    success: {},
    errors: {},
}

export default (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case REGISTER_REQUEST:
            // An action which is always called when the user tries to register.
            return { ...state, isLoading: true };
        case REGISTER_SUCCESS:
            // On success the state is updated, the success message is returned,
            // errors are cleared and isLoading is set to false.
            return { ...state, success: payload.success, errors: {}, isLoading: false };
        case REGISTER_FAILURE:
            // On registration failure, the state is updated, errors are updated,
            // success is cleared and isLoading is set to false.
            return { ...state, success: {}, errors: payload, isLoading: false }
        case LOGIN_REQUEST:
            // An action called every time the user tries to login.
            return { ...state, isLoading: true };
        case LOGIN_SUCCESS:
            //
            return { ...state, success: payload.success, errors: {}, isLoading: false }
        case LOGIN_FAILURE:
            //
            return { ...state, success: {}, errors: payload, isLoadng: false }
        default:
            return state;
    }
}

export const requestRegistration = (data) => dispatch => {
    dispatch({
        type: REGISTER_REQUEST,
    })
    authAPI.createNewUser(data)
        .then(res => {
            const { data } = res;
            dispatch({
                type: REGISTER_SUCCESS,
                payload: data,
            })
        })
        .catch(err => {
            const { errors } = err.response.data;
            dispatch({
                type: REGISTER_FAILURE,
                payload: errors,
            })
        })
}

export const requestLogin = (data) => dispatch => {
    dispatch({
        type: LOGIN_REQUEST,
    })
    authAPI.login(data)
        .then(res => {
            const { data } = res;
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data,
            })
        })
        .catch(err => {
            const { errors } = err.response.data;
            dispatch({
                type: LOGIN_FAILURE,
                payload: errors,
            })
        })
}