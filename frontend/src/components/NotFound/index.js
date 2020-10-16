import React from 'react';
import './style.scss';

// Component which handles all invalid address inputs.
const NotFound = () => {
    return (
        <div className='container-notFound'>
            <div className='notFound'>
                <h1>Page <span> not</span> found.</h1>
            </div>
        </div >
    )
}

export default NotFound;