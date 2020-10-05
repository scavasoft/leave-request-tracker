import React from 'react'
import Calendar from '../../components/basic/Calendar'
import Menu from '../../components/basic/Menu'
import Sidebar from '../../components/basic/Sidebar'
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