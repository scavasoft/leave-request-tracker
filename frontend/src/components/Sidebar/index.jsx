import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {attemptLeaveRequest} from "../../reducers/addLeaveRequest";
import Input from '../../components/basic/Input';
import Button from '../../components/basic/Button';
import themes from '../../utils/themes';
import DropDown from "../../components/basic/DropDown";
import {TYPE} from "../../config";

import './style.scss';

const Sidebar = () => {
    const dispatch = useDispatch();

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
        <div className='sidebar' >
            <form>
                <Input
                    onChange={nameChanged}
                    label='Name'
                    type='text'
                />

                <Input
                    onChange={reasonChanged}
                    label='Reason'
                    type='text'
                />

                <DropDown
                    values={[TYPE.VACATION, TYPE.SICK_DAY, TYPE.WEEDING, TYPE.DEAD]}
                    onChange={typeChanged}
                />


                <Input
                    onChange={startDateChanged}
                    type='date'
                />

                <Input
                    onChange={endDateChanged}
                    type='date'
                />

                <Button
                    text='Send request'
                    onClick={request}
                    padding={15}
                    color={themes.BASE_THEME.surface}
                    backgroundColor={themes.BASE_THEME.secondary}
                />
            </form>
        </div>
    )
}

export default Sidebar;