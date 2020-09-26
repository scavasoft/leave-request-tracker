import React from 'react';
import Calendar from 'react-calendar';

// Old CSS styling, deprecated due being unmodifiable.
// import 'react-calendar/dist/Calendar.css';

import './Calendar.scss'

// React Component which initializes the imported Calendar.
class NewCalendar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                {/* The selectRange property is responsible for the ability to
                choose a range of multiple dates and the calendarType prop formats
                the calendar according to the ISO 8601 standart. */}
                <div className="container-submenu">
                    {/* Beginning of exemplary menu. */}
                    <h2>Example Menu</h2>
                    <ul>
                        <li><a href="#"><i className="fas fa-home"></i> Lorem</a></li>
                        <li><a href="#"><i className="fas fa-calendar-alt"></i> Ipsum</a></li>
                        <li><a href="#"><i className="fas fa-user"></i> Lorem</a></li>
                        <li><a href="#"><i className="fas fa-users"></i> Ipsum</a></li>
                        <li><a href="#"><i className="fas fa-wrench"></i> Lorem</a></li>
                        <li><a href="#"><i className="fas fa-toolbox"></i> Ipsum</a></li>
                        <li><a href="#"><i className="fas fa-chart-line"></i> Lorem</a></li>
                        <li><a href="#"><i className="fas fa-trash"></i> Ipsum</a></li>
                    </ul>
                    {/* End of exemplary menu. */}
                </div>
                <Calendar
                    selectRange={true}
                    calendarType={"ISO 8601"}
                />
            </div >
        )
    }
}

export default (NewCalendar);