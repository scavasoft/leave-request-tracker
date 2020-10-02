import React, { useCallback, useState } from 'react';
import Container from './containerDashboard'
import { attemptLeaveRequest } from '../../reducers/addLeaveRequest';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/basic/Input';
import Button from '../../components/basic/Button';
import themes from '../../utils/themes';
import DropDown from "../../components/basic/DropDown";
import {TYPE} from "../../config";
const Renderer = React.memo( () => {
    //const selector = useSelector(state => state.attemp);
    const dispatch = useDispatch();

    // const reason = 'I gonna be married';
    //const type = 'Weeding';
    // const name = 'Stoyan Ivanov';
    // const startDate = '12-10-2020';
    // const endDate = '14-10-2020';
    // const { reason, type, name, startDate, endDate } = useState('');

    const [reason, setReason] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [onClose, setOpen] = useState(false);

    const reasonChanged = useCallback(e => setReason(e.target.value), []);
    const typeChanged = useCallback(e => setType(e.target.value), []);
    const nameChanged = useCallback(e => setName(e.target.value), []);
    const startDateChanged = useCallback(e => setStartDate(e.target.value), []);
    const endDateChanged = useCallback(e => setEndDate(e.target.value), []);

    console.log(type)

    const handleClose = () => {
        setOpen(false);
    };

    function request(e) {
        e.preventDefault();
        dispatch(attemptLeaveRequest({
            reason,
            type,
            name,
            startDate,
            endDate,
        }, [reason, type, name, startDate, endDate]));
    }

    return (
        <div>
            <Container />

            <Input
                onChange={nameChanged}
                label='Name'
                type='text'
            />

            <div>Name: {name}</div>

            <Input
                onChange={reasonChanged}
                label='Reason'
                type='text'
            />

            <div>Reason: {reason}</div>

            <DropDown
                values={[TYPE.VACATION, TYPE.SICK_DAY, TYPE.WEEDING, TYPE.DEAD]}
                onChange={typeChanged}
            />

            <div>Type: {type}</div>

            <Input
                onChange={startDateChanged}
                label='startDate'
                type='date'
            />

            <div>start date: {startDate}</div>

            <Input
                onChange={endDateChanged}
                label='endDate'
                type='date'
            />

            <div>end date: {endDate}</div>

            <Button
                text='Send request'
                onClick={request}
                onClose={handleClose}
                size={20}
                color={themes.BASE_THEME.surface}
                backgroundColor={themes.BASE_THEME.secondary}
            />
        </div>
    )
});

export default Renderer;