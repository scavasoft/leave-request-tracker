import authAPI from '../api/authAPI';

// Actions for Registration
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

// Actions for login
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

const LOADING = 'LOADING';

const initialState = {
    isLoading: false,
    success: {},
    errors: {},
    logInErrors: {},
    isLoggedIn: false,
    user: {},
}

export default (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case LOADING:
            // An action which is always called when the user tries to register.
            return { ...state, isLoading: true };
        case REGISTER_SUCCESS:
            // On success the state is updated, the success message is returned,
            // errors are cleared and isLoading is set to false.
            return { ...state,
                success: payload.success,
                errors: {},
                isLoading: false
            };
        case REGISTER_FAILURE:
            // On registration failure, the state is updated, errors are updated,
            // success is cleared and isLoading is set to false.
            return { ...state,
                success: {},
                errors: payload,
                isLoading: false
            }
        case LOGIN_SUCCESS:
            // On successful login the state is updated, success message returned,
            // errors cleaned and isLoading set to false.
            return { ...state,
                errors: {},
                logInErrors: {},
                isLoading: false,
                isLoggedIn: true,
                user: payload,
            }
        case LOGIN_FAILURE:
            // On login failure the state is updated, success is cleared, errors
            // are updated and isLoading is set to false.
            return { ...state,
                success: {},
                logInErrors: payload,
                isLoading: false,
            }
        case LOGOUT:
            return {
                ...state,
                success: {},
                errors: {},
                isLoading: false,
                isLoggedIn: false,
                user: {},
            }
        default:
            return state;
    }
}

export const requestRegistration = (data) => dispatch => {
    dispatch({
        type: LOADING,
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
            let res = errors;
            if(errors === undefined)
                res = err.response.data;
            dispatch({
                type: REGISTER_FAILURE,
                payload: res,
            });
        });
}

export const getUserByToken = () => dispatch => {
    const token = localStorage.getItem('token');

    if (token) {
        dispatch({
            type: LOADING,
        });

        authAPI.getUserByToken().then(({ data }) => {
            if (data) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: data,
                });
            }
        });
    }
}

export const requestLogin = (data) => dispatch => {
    dispatch({
        type: LOADING,
    })

    authAPI.login(data)
        .then(res => {
            const { data } = res;
            localStorage.setItem('token', data.token); // Save jwt in the local storage

            authAPI.getUserByToken().then(res => {
                const { data } = res;

                if(data) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: data,
                    })
                }
            });
        })
        .catch(err => {
            const { errors } = err.response.data;
            let res = errors;
            if(errors === undefined)
                res = err.response.data;
            dispatch({
                type: LOGIN_FAILURE,
                payload: res,
            })
        })
}

export const logout = () => dispatch => {
    dispatch({
        type: LOADING,
    })

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({
        type: LOGOUT,
    })
}