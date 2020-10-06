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
        <div>
            <Container />

        </div>


    )
});

export default Renderer;