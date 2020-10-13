import React from 'react';
import Menu from '../../components/Menu/index';
import RequestsTable from '../../components/Requests/index';
import './style.scss';

const Requests = () => {
    return (
        <div className='leaves-mainPanel'>
            <div className='leaves-leftPanel'>
                <Menu id='menu' />
            </div>
            <div className='leaves-rightPanel'>
                <RequestsTable />
            </div>
        </div>
    )
}

export default Requests;