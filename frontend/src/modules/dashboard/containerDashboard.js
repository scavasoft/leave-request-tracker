import React from 'react'
import Calendar from '../../components/Calendar'
import Menu from '../../components/Menu'
import Sidebar from '../../components/Sidebar'
import './style.scss'

const Container = () => {
    // TODO: Create a state for the Calendar value.
    return (
        <div className='container-mainPanel'>
            <div className='container-leftPanel'>
                <Menu />
            </div>
            <div className='container-rightPanel'>
                <div className='container-calendar'>
                    <Calendar />
                </div>
                <div className='container-sidebar'>
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
export default Container;