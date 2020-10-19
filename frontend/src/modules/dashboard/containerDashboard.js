import React from 'react'
import Calendar from '../../components/Calendar'
import Menu from '../../components/Menu'
import ToDo from '../../components/ToDo'
import Sidebar from '../../components/Sidebar'
import './style.scss'

const Dashboard = () => {
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
export default Dashboard;