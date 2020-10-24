import React from 'react';
import './style.scss';

// Component which handles all invalid address inputs.
const NotFound = () => {
    return (
        <div className='container-notFound'>
            <div className='notFound'>
                <div className='notFound-items'>
                    <h1>Page <span> not</span> found.</h1>
                    <p>...or you do not have permission ¯\_(ツ)_/¯</p>
                </div>
            </div>
        </div >
    )
}

export default NotFound;