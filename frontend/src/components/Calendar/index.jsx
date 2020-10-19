import React from 'react';
import { connect } from "react-redux";
import Calendar from 'react-calendar';
import { attemptStoreDate } from "../../reducers/calendarReducer";

// Old CSS styling, deprecated due to being unmodifiable.
// import 'react-calendar/dist/Calendar.css';

import './style.scss'

// React Component which initializes the imported Calendar.
class NewCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.startDate = new Date(); // new state variables which save start and end date from the calendar
        this.endDate = new Date();
    }

    componentDidMount() {
        document.addEventListener('keydown', event => {
            if (event.keyCode === 27) {
                this.handleClick();
            }
        })
    }

    //Format from Date to SQL date (yyyy-MM-dd)
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

    handleChange = (data) => {
        const [startDate, endDate] = data;
        this.startDate = startDate; //setState
        this.endDate = endDate; //setState

        const { dispatch } = this.props;

        dispatch(attemptStoreDate({
            startDate: this.formatDate(this.startDate),
            endDate: this.formatDate(this.endDate),

        }, [this.startDate, this.endDate]));

        document.getElementsByClassName('sidebar')[0].classList.add('sidebarShow')
        document.getElementsByClassName('react-calendar')[0].classList.add('resize');
    }

    handleClick = () => {
        document.getElementsByClassName('sidebar')[0].classList.remove('sidebarShow');
    }

    render() {
        return (
            <div>
                {/* The selectRange property is responsible for the ability to
                choose a range of multiple dates and the calendarType prop formats
                the calendar according to the ISO 8601 standard. */}
                <Calendar
                    selectRange={true}
                    calendarType={'ISO 8601'}
                    onChange={this.handleChange}
                    onClickDay={this.handleClick}
                    locale={'en'}
                />
            </div>
        )
    }
}



export default connect()(NewCalendar);