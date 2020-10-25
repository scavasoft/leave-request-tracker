import React from 'react';
import leaveRequestAPI from '../../api/leaveRequestAPI';
import { withStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import Button from '../basic/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import './style.scss';
import LeaveRequestAPI from "../../api/leaveRequestAPI";
import Pagination from "../Pagination";

const styles = theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'solid red',
        borderRadius: '5px',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        width: '30vw',
        fontFamily: '\'Poppins\', sans-serif',
        boxShadow: '0px 0px 13px -5px rgba(0,0,0,0.75), inset 0 0 1px #000000',
    },
    modalTitle: {
        margin: 0,
        color: '#ffffff',
        padding: '0.5em',
        backgroundColor: '#505050',
        borderBottom: '1px solid #000000',
        borderRadius: '5px 5px 0 0'
    },
    modalText: {
        padding: '1em'
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'space-evenly',
        padding: '1em',
    }
});
class RequestsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLeaves: [],
            open: false,
            targetLeaveRequest: '',
            successMessage: null,
            errors: null,
        }
        this.changeFilter = this.changeFilter.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleDeny = this.handleDeny.bind(this);
    }

    componentDidMount() {
        leaveRequestAPI.getAllLeaveRequests().then(res => {
            const { data } = res;
            this.setState({ userLeaves: data });
        });
    }

    changeFilter(e) {
        leaveRequestAPI.getAllLeaveRequests(true, e.target.value).then(res => {
            const { data } = res;
            this.setState({ userLeaves: data });
        });
    }

    handleOpen(event) {
        this.setState({ open: true });

        leaveRequestAPI.getLeaveRequestById(event.currentTarget.dataset.tag).then(res => {
            const { data } = res;

            //check if user leave request is not approved
            if (!data.is_approved)
                this.setState({ targetLeaveRequest: data });
        })
    };

    handleClose() {
        this.setState({ open: false });
    };

    handleAccept() {
        LeaveRequestAPI.updateApprove({
            id: this.state.targetLeaveRequest.id,
            name: this.state.targetLeaveRequest.name,
            type: this.state.targetLeaveRequest.type,
            startDate: this.state.targetLeaveRequest.date_start,
            endDate: this.state.targetLeaveRequest.date_end,
            reason: this.state.targetLeaveRequest.reason,
        })
            .then(res => {
                const { data } = res;

                this.setState({ successMessage: data });
                //refresh page to be updated the list with user leave requests
                window.location.reload();
            })
            .catch(err => {
                const { errors } = err.response.data;
                let res = errors;
                if (errors === undefined)
                    res = err.response.data;

                this.setState({ errors: res });
            });
    }

    handleDeny() {
        leaveRequestAPI.deleteLeaveRequest({ id: this.state.targetLeaveRequest.id }).then(res => {
            const { data } = res;

            this.setState({ successMessage: data });
            //refresh page to be updated the list with user leave requests
            window.location.reload();
        }).catch(err => {
            const { errors } = err.response.data;
            let res = errors;
            if (errors === undefined)
                res = err.response.data;

            this.setState({ errors: res });
        });
    }


    render() {
        const { classes } = this.props;

        return (
            <div className='container-datatable'>
                <div className='datatable'>
                    <div className='datatable-upperPanel'>
                        <input id='filterInput' onChange={this.changeFilter} placeholder='Enter a name:' maxLength='90'></input>
                    </div>
                    <div className='datatable-lowerPanel'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>
                                        <p>Name</p>
                                    </th>
                                    <th>
                                        <p>Type</p>
                                    </th>
                                    <th>
                                        <p>Date Start</p>
                                    </th>
                                    <th>
                                        <p>Date End</p>
                                    </th>
                                    <th>
                                        <p>Reason</p>
                                    </th>
                                </tr>

                                {this.state.userLeaves.map(userLeave => {
                                    //Data tag substitutes value in this case
                                    //It can be reused in the modal filed through onClick function in the state(targetLeaveValue)
                                    if (userLeave.is_approved === 0) {
                                        return <tr key={userLeave.id} onClick={this.handleOpen} data-tag={userLeave.id}>
                                            <td>{userLeave.name}</td>
                                            <td>{userLeave.type}</td>
                                            <td>{userLeave.date_start}</td>
                                            <td>{userLeave.date_end}</td>
                                            <td>{userLeave.reason}</td>
                                        </tr>
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={this.state.open}
                        onClose={this.handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={this.state.open}>
                            <div className={classes.paper}>
                                <h2 className={classes.modalTitle} id="transition-modal-title">Approve leave?</h2>

                                <p className={classes.modalText} id="transition-modal-description">
                                    Would you like to approve {this.state.targetLeaveRequest.name}'s leave request?
                            </p>
                                <div className={classes.modalButtons}>
                                    <Button
                                        text={'Accept'}
                                        width={'90%'}
                                        fontSize={'1em'}
                                        padding='4px 8px'
                                        borderRadius='8px'
                                        boxShadow='2px 2px 2px black'
                                        onClick={this.handleAccept}
                                        transition={'.5s all'}
                                    />
                                    <Button
                                        text={'Deny'}
                                        width={'90%'}
                                        fontSize={'1em'}
                                        padding='4px 8px'
                                        borderRadius='8px'
                                        boxShadow='2px 2px 2px black'
                                        onClick={this.handleDeny}
                                        transition={'.5s all'}
                                    />
                                </div>
                                {this.state.errors !== null && (
                                    <div className='error'>{Object.values(this.state.errors)}</div>
                                )
                                }

                                {this.state.successMessage !== null && (
                                    <div className='success'>{Object.values(this.state.successMessage)}</div>
                                )
                                }
                            </div>
                        </Fade>
                    </Modal>
                </div >
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(RequestsTable);