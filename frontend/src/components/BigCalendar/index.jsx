import React from 'react';
import { connect } from "react-redux";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { obtainApprovedRequests } from '../../reducers/obtainLeaveRequestsReducer';
import moment from 'moment';
import { attemptStoreDate } from "../../reducers/calendarReducer";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './style.scss';

moment.locale('en-GB')
const localizer = momentLocalizer(moment);

export class BigDNDCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
        };
        this.handleSelectSlot = this.handleSelectSlot.bind(this);
        this.selectDateRange = this.selectDateRange.bind(this);
    }

    componentDidMount() {
        this.props.obtainApprovedRequests();
    }

    // Toggling the sidebar and decreasing the size of the calendar.
    selectDateRange() {
        document.getElementsByClassName('sidebar')[0].classList.add('sidebarShow');
        document.getElementsByClassName('calendar')[0].classList.add('resize');
    }

    // Format from Date to SQL date (yyyy-MM-dd)
    formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    // Selecting a range of dates will dispatch the starting and
    // ending date of the leave request to the Redux Store.
    handleSelectSlot({ start, end, resourceId }) {
        this.startDate = start; //setState
        this.endDate = end; //setState

        this.props.attemptStoreDate({
            startDate: this.formatDate(this.startDate),
            endDate: this.formatDate(this.endDate),
        });

        this.selectDateRange();
    }

    render() {
        return (
            <Calendar
                className={'calendar'}
                onSelectSlot={this.handleSelectSlot}
                selectable
                localizer={localizer}
                events={this.props.success.map((leave) => ({
                    'title': `${leave.reason} by ${leave.name}`,
                    'allDay': true,
                    'start': new Date(leave.date_start),
                    'end': new Date(leave.date_end),
                    'color': leave.color,
                })
                )}
                eventPropGetter={event => ({
                    style: {
                        backgroundColor: event.color
                    },
                })}
            />
        )
    }
}


const mapStateToProps = ({ obtainApprovedRequests: { success } }) => ({
    success
});

// Mapping the dispatch and storing it as a prop, so we can reuse it.
const mapDispatchToProps = {
    obtainApprovedRequests,
    attemptStoreDate,
}
export default connect(mapStateToProps, mapDispatchToProps)(BigDNDCalendar);