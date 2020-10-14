import React, {useCallback, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { attemptLeaveRequest } from "../../reducers/addLeaveRequestReducer";
import { createSelector } from 'reselect';
import Input from '../../components/basic/Input';
import Button from '../../components/basic/Button';
import DropDown from "../../components/basic/DropDown";
import { TYPE } from "../../config";

import './style.scss';
import {attemptStoreDate} from "../../reducers/calendarReducer";

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
        e.preventDefault(); //To don't refresh when we click on the button

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
            <form id='sideBarForm'>
                <Input
                    helperText='Name'
                    type='text'
                    value={name || ''}
                    onChange={nameChanged}
                />
                {errors.hasOwnProperty('name') && (
                    <div className='error'>{errors['name']}</div>
                    )
                }

                <Input
                    helperText='Reason'
                    type='text'
                    inputType={'textarea'}
                    width={'100%'}
                    padding={'15px'}
                    borderRadius={12}
                    withCharacterCount={true}
                    onChange={reasonChanged}
                    value={reason || ''}
                />
                {errors.hasOwnProperty('reason') && (
                    <div className='error'>{errors['reason']}</div>
                )
                }

                <DropDown
                    values={[TYPE.VACATION, TYPE.SICK_DAY, TYPE.WEEDING, TYPE.DEAD]}
                    onChange={typeChanged}
                />
                {errors.hasOwnProperty('type') && (
                    <div className='error'>{errors['type']}</div>
                )
                }

                <Input
                    type='date'
                    onChange={startDateChanged}
                    value={startDate || ''}
                />
                {errors.hasOwnProperty('date') && (
                    <div className='error'>{errors['date']}</div>
                )
                }

                <Input
                    type='date'
                    onChange={endDateChanged}
                    value={endDate || ''}
                />

                <Button
                    text='Send request'
                    padding='15px'
                    borderRadius='8px'
                    boxShadow='2px 2px 2px black'
                    onClick={request}
                />
            </form>
        </div>
    )
}

export default Sidebar;