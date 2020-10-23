import React from 'react';
import { connect } from "react-redux";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import { attemptStoreDate } from "../../reducers/calendarReducer";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './style.scss';

moment.locale('en-GB')
const localizer = momentLocalizer(moment);

export class BigDNDCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: events,
            startDate: new Date(),
            endDate: new Date(),
        };
        this.handleSelectSlot = this.handleSelectSlot.bind(this);
        this.selectDateRange = this.selectDateRange.bind(this);
    }

    componentDidMount() {
        this.loadEvents();
    }

    loadEvents() {
        // TODO: Load the events from the DB
        this.setState({
            events: [{
                'title': 'Example Event 1',
                'allDay': true,
                'start': new Date(2020,
                    9,
                    0),
                'end': new Date(2020,
                    9,
                    3)
            }]
        })
    }

    // deprecated event coloring function
    // componentDidMount() {
    //     setTimeout(() => {
    //         // Obtain unique ID for each element and set it's color to a random HEX.
    //         let leaves = document.getElementsByClassName('rbc-event')
    //         let colors = [];
    //         for (let i = 0; i < leaves.length; i++) {
    //             colors.push(Math.floor(Math.random() * 16777215).toString(16));
    //             leaves[i].style.backgroundColor = `#${colors[i]}`;
    //             // leaves[i].classList.add('randomBackground');
    //             // alert(leaves[i].innerHTML)
    //         }
    //     }, 100)
    // }

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

    handleSelectSlot({ start, end, resourceId }) {
        console.log("Selected", start, end);

        this.startDate = start; //setState
        this.endDate = end; //setState

        const { dispatch } = this.props;

        dispatch(attemptStoreDate({
            startDate: this.formatDate(this.startDate),
            endDate: this.formatDate(this.endDate),

        }, [this.startDate, this.endDate]));

        this.selectDateRange()
    }

    render() {
        return (
            <Calendar
                className={'calendar'}
                onSelectSlot={this.handleSelectSlot}
                selectable
                localizer={localizer}
                events={this.state.events}
            />
        )
    }
}

export default connect()(BigDNDCalendar);