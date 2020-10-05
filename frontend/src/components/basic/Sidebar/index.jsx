import React from 'react';
import './style.scss';

const Sidebar = () => {
    return (
        <div className='sidebar' >
            <form>
                <div className='sidebar-element sidebar-topelement'>
                    <label>Name:<input required placeholder='Employee name'></input></label>
                </div>
                <div className='sidebar-element'>
                    <label>Type:
                <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </label>
                </div>
                {/* TODO: Logic for date validation, to date mustn't be N days earlier from from date. */}
                <div className='sidebar-element'>
                    <label>From Date:
                    <input id='dateFrom' type='date' required></input></label>
                </div>
                <div className='sidebar-element'>
                    <label>To Date:
                    <input id='dateTo' type='date' required></input></label>
                </div>
                <div className='sidebar-element'>
                    <label>Reason:
                    <textarea required placeholder='Explain the reason for you leave.'></textarea></label>
                </div>
                <div className='sidebar-buttons'>
                    {/* TODO: Submit button must open a modal asking the user whether he wants to submit or not. */}
                    <button>Submit</button>
                    {/* TODO: Reset button must remove the selected range from the Calendar.*/}
                    <button type='reset'>Reset</button>
                </div>
            </form>
        </div>
    )
}

export default Sidebar;