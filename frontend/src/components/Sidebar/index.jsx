import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { attemptLeaveRequest } from "../../reducers/addLeaveRequestReducer";
import { createSelector } from 'reselect';
import Input from '../../components/basic/Input';
import Button from '../../components/basic/Button';
import DropDown from "../../components/basic/DropDown";
import { TYPE } from "../../config";

import './style.scss';
import { attemptStoreDate } from "../../reducers/calendarReducer";

const selector = createSelector(
    store => store.calendarReducer.calendar.startDate,
    store => store.calendarReducer.calendar.endDate,
    (startDate, endDate) => ({
        startDate,
        endDate,
    })
)

const errorSelector = createSelector(
    store => store.addLeaveRequestReducer.requestErrors,
    (errors) => ({
        errors
    })
)
const Sidebar = () => {
    const dispatch = useDispatch(); //This is the only way to trigger a state change

    //Init state variables
    const [reason, setReason] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');

    //Get calendar state from the Redux store
    const { startDate, endDate } = useSelector(selector);
    const { errors } = useSelector(errorSelector);

    //These callbacks call function textChanges which location is in our basic Input component
    const reasonChanged = useCallback(e => setReason(e.target.value), []);
    const typeChanged = useCallback(e => setType(e.target.value), []);
    const nameChanged = useCallback(e => setName(e.target.value), []);
    const startDateChanged = e => {
        dispatch(attemptStoreDate({
            startDate: e.target.value,
        }), [e.target.value]);
    };

    const endDateChanged = e => {
        dispatch(attemptStoreDate({
            endDate: e.target.value
        }), [e.target.value]);
    };

    function request(e) {
        e.preventDefault(); //Prevent refresh on button click

        //Dispatch the information from each field in the right drawer menu
        //Look the function in reducers/addLeaveRequestReducer
        dispatch(attemptLeaveRequest({
            name,
            reason,
            type,
            startDate,
            endDate,
        }, [name, reason, type]));
    }

    return (
        <div className='sidebar' >
            <form id='sidebarForm'>
                <label>Name
                <Input
                        value={name || ''}
                        onChange={nameChanged}
                        type={'text'}
                        width={'90%'}
                        height={'2em'}
                        fontSize={'1em'}
                        borderRadius={'1px'}
                        padding={'0.3em'}
                    /></label>
                {errors.hasOwnProperty('name') && (
                    <div className='error'>{errors['name']}</div>
                )
                }

                <label>Reason
                <Input
                        type={'text'}
                        inputType={'textarea'}
                        height={'6em'}
                        width={'90%'}
                        fontSize={'1em'}
                        padding={'3px'}
                        borderRadius={12}
                        withCharacterCount={true}
                        onChange={reasonChanged}
                        value={reason || ''}
                    /></label>
                {errors.hasOwnProperty('reason') && (
                    <div className='error'>{errors['reason']}</div>
                )
                }

                <label>Reason
                <DropDown
                        values={[TYPE.VACATION, TYPE.SICK_DAY, TYPE.WEDDING, TYPE.DEAD]}
                        onChange={typeChanged}
                        width={'90%'}
                        fontSize={'1em'}
                    />
                    {errors.hasOwnProperty('type') && (
                        <div className='error'>{errors['type']}</div>
                    )
                    }</label>

                <label>Beginning Date
                <Input
                        type={'date'}
                        width={'90%'}
                        padding={'3px'}
                        fontSize={'1em'}
                        onChange={startDateChanged}
                        value={startDate || ''}
                    />
                    {errors.hasOwnProperty('date') && (
                        <div className='error'>{errors['date']}</div>
                    )
                    }</label>

                <label>End Date
                <Input
                        type={'date'}
                        width={'90%'}
                        padding={'3px'}
                        fontSize={'1em'}
                        onChange={endDateChanged}
                        value={endDate || ''}
                    /></label>
                {errors.hasOwnProperty('dateError') && (
                    <div className='error'>{errors['dateError']}</div>
                )
                }

                <Button
                    text={'Send request'}
                    width={'90%'}
                    fontSize={'1em'}
                    padding='15px'
                    borderRadius='8px'
                    boxShadow='2px 2px 2px black'
                    onClick={request}
                    transition={'.5s all'}
                />
            </form>
        </div>
    )
}

export default Sidebar;