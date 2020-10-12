const SUCCESS_STORE_DATE = 'SUCCESS_STORE_DATE';
const ERROR_STORE_DATE = 'ERROR_STORE_DATE';

const initialState = {
    error: { },
    calendar: { },
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SUCCESS_STORE_DATE: // If we get SUCCESS we save calendar dates in the store
            return {
            ...state,
            calendar: payload,
             };
        case ERROR_STORE_DATE:
            return {
                ...state,
                error: payload,
            };
        default: return state;
    }
}

export const attemptStoreDate = (data) => dispatch => {

    if(data !== null && typeof data !== 'undefined') { // If everything is okay
        //Dispatch SUCCESS type and payload with start date and end date dragged in our calendar
        dispatch({
           type: SUCCESS_STORE_DATE,
           payload: {
               ...data,
           },
        });
    }else {
        dispatch({
            type: ERROR_STORE_DATE,
            payload: 'Error to store data',
        });
    }
}