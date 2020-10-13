import React from 'react';
import Calendar from 'react-calendar';

// Old CSS styling, deprecated due to being unmodifiable.
// import 'react-calendar/dist/Calendar.css';

import './style.scss'

// React Component which initializes the imported Calendar.
class NewCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keydown', event => {
            if (event.keyCode === 27) {
                this.handleClick();
            }
        })
    }
    handleChange = () => {
        let sidebar = document.getElementsByClassName('sidebar')[0];
        let calendar = document.getElementsByClassName('react-calendar')[0];
        calendar.classList.toggle('resize');
        sidebar.classList.add('sidebarShow')
    }
    handleClick = () => {
        let sidebar = document.getElementsByClassName('sidebar')[0];
        sidebar.classList.remove('sidebarShow');
    }
    render() {
        return (
            <div>
                {/* The selectRange property is responsible for the ability to
                choose a range of multiple dates and the calendarType prop formats
                the calendar according to the ISO 8601 standart. */}
                <Calendar
                    selectRange={true}
                    calendarType={'ISO 8601'}
                    onChange={this.handleChange}
                    onClickDay={this.handleClick}
                />
            </div>
        )
    }
}

export default NewCalendar;