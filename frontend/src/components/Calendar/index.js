import React from 'react';
import Calendar from 'react-calendar';

// Old CSS styling, deprecated due to being unmodifiable.
// import 'react-calendar/dist/Calendar.css';

import './style.scss'

// React Component which initializes the imported Calendar.
const NewCalendar = () => {
    return (
        <div>
            {/* The selectRange property is responsible for the ability to
                choose a range of multiple dates and the calendarType prop formats
                the calendar according to the ISO 8601 standart. */}
            <Calendar
                selectRange={true}
                calendarType={'ISO 8601'}
            />
        </div>
    )
}

export default NewCalendar;