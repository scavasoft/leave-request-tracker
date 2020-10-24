import React from 'react'
import Calendar from '../../components/Calendar/index'
import Menu from '../../components/Menu/index'
import ToDo from '../../components/ToDo/index'
import Sidebar from '../../components/Sidebar/index'
import './style.scss'

const Container = () => {
    return (
        <div className='dashboard-mainPanel'>
            <div className='dashboard-leftPanel'>
                <Menu />
            </div>
            <div className='dashboard-rightPanel'>
                <div className='dashboard-calendar'>
                    <Calendar />
                </div>
                <div className='dashboard-toDo'>
                    <ToDo />
                </div>
                <div className='dashboard-sidebar'>
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}

export default Container;