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
        calendar.style.width = '82%';
        // Change width changing method through class toggling.
        // sidebar.classList.toggle('react-calendarEnlarged')
        sidebar.classList.add('sidebarShow')
        // document.getElementById('dateFrom').value = ''; // Set to range beginning date.
        // document.getElementById('dateTo').value = ''; // Set to range end date.
    }
    handleClick = () => {
        let sidebar = document.getElementsByClassName('sidebar')[0];
        let calendar = document.getElementsByClassName('react-calendar')[0];
        calendar.style.width = '100%';
        sidebar.classList.remove('sidebarShow')
        document.getElementsByTagName('form')[0].reset();
        // TODO: Clear selected range.
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