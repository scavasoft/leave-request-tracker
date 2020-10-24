//Actions
const SUCCESS_STORE_DATE = 'SUCCESS_STORE_DATE';
const SUCCESS_STORE_START_DATE = 'SUCCESS_STORE_START_DATE';
const SUCCESS_STORE_END_DATE = 'SUCCESS_STORE_END_DATE';
const ERROR_STORE_DATE = 'ERROR_STORE_DATE';

const initialState = {
    error: { },
    calendar: { },
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SUCCESS_STORE_DATE: { // If we get SUCCESS we save calendar dates in the store
            return {
                ...state,
                calendar: payload,
            };
        }
        case SUCCESS_STORE_START_DATE: { // If we get SUCCESS we save start dates in the store
            return {
                ...state,
                calendar: {
                    ...state.calendar,
                    startDate: payload.startDate,
                },
            };
        }
        case SUCCESS_STORE_END_DATE: { // If we get SUCCESS we save end dates in the store
            return {
                ...state,
                calendar: {
                    ...state.calendar,
                    endDate: payload.endDate,
                }
            };
        }
        case ERROR_STORE_DATE: {
            return {
                ...state,
                error: payload,
            };
        }
        default: return state;
    }
}

export const attemptStoreDate = (data) => dispatch => {
    const { startDate, endDate } = data;
    if(data !== null && data !== 'undefined') { // If we have some data
        if(typeof startDate !== 'undefined' && typeof endDate === 'undefined') {
            dispatch({
                type: SUCCESS_STORE_START_DATE,
                payload: {
                    startDate: startDate,
                }
            })
        }else if(typeof endDate !== 'undefined' && typeof startDate === 'undefined') {
            dispatch({
                type: SUCCESS_STORE_END_DATE,
                payload: {
                    endDate: endDate,
                }
            })
        }else { //Dispatch SUCCESS type and payload with start date and end date dragged in our calendar
            dispatch({
                type: SUCCESS_STORE_DATE,
                payload: {
                    ...data,
                },
            });
        }
    }else {
        dispatch({
            type: ERROR_STORE_DATE,
            payload: 'Error to store data',
        });
    }
}