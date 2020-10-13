import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { attemptLeaveRequest } from "../../reducers/addLeaveRequestReducer";
import { createSelector } from 'reselect';
import Input from '../../components/basic/Input';
import Button from '../../components/basic/Button';
import DropDown from "../../components/basic/DropDown";
import { TYPE } from "../../config";

import './style.scss';

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
    const dispatch = useDispatch();

    const [reason, setReason] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');

    const reasonChanged = useCallback(e => setReason(e.target.value), []);
    const typeChanged = useCallback(e => setType(e.target.value), []);
    const nameChanged = useCallback(e => setName(e.target.value), []);

    //Get calendar state from the Redux store
    const { startDate, endDate } = useSelector(selector);
    const { errors } = useSelector(errorSelector);

    function request(e) {
        e.preventDefault();

        dispatch(attemptLeaveRequest({
            name,
            reason,
            type,
            startDate,
            endDate,
        }, [name, reason, type]));
    }

    //Render list with errors if we have
    const errorItems = [];
    if (Object.keys(errors).length > 0) {
        for (const object in errors) {
            errorItems.push(<li key={object}>{errors[object]}</li>)
        }
    }

    return (
        <div className='sidebar' >
            <form id='sideBarForm'>
                <Input
                    helperText='Name'
                    type='text'
                    inComingValue={name}
                    onChange={nameChanged}
                />

                <Input
                    helperText='Reason'
                    type='text'
                    inputType={'textarea'}
                    width={'80%'}
                    withCharacterCount={true}
                    inComingValue={reason}
                    onChange={reasonChanged}
                />

                <DropDown
                    values={[TYPE.VACATION, TYPE.SICK_DAY, TYPE.WEEDING, TYPE.DEAD]}
                    onChange={typeChanged}
                    width={'30%'}
                />

                < Input
                    type='date'
                    inComingValue={startDate || ' '}
                />

                <Input
                    type='date'
                    inComingValue={endDate || ' '}
                />

                <Button
                    text='Send request'
                    padding={'15px'}
                    borderRadius={8}
                    boxShadow={'2px 2px 2px black'}
                    onClick={request}
                />

                {errors !== 'undefined' && (
                    <ul>
                        {errorItems}
                    </ul>
                )
                }
            </form>
        </div>
    )
}

export default Sidebar;