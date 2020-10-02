import React from 'react'
import Calendar from '../../components/Calendar'
import Menu from '../../components/Menu'
import Modal from '../../components/Modal'
import './style.scss'

const Container = () => {
    return (
        <div className='container-mainPanel'>
            <div className='container-leftPanel'>
                <Menu />
            </div>
            <div className='container-rightPanel'>
                <div className='container-calendar'>
                    <Calendar />
                </div>
                <div className='container-modal'>
                    <Modal />
                </div>
            </div>
        </div>
    );
}

export default Container;