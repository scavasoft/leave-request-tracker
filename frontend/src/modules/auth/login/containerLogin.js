import React from 'react';
import './style.scss';
import Input from '../../../components/basic/Input/index';
import Button from '../../../components/basic/Button/index';
import Register from '../register/index';

const LoginScreen = () => {
    return (
        <div className='container-loginScreen'>
            <div className='loginScreen'>
                <div className='loginScreen-leftPanel'>
                    <h1>login</h1>
                    <div className='loginScreen-inputs'>
                        <label>username
                        <Input
                                label=''
                                type='text'
                            /></label>
                        <label>password
                        <Input
                                label=''
                                type='password'
                            /></label>
                    </div>
                    <div className='loginScreen-extras'>
                        <input id='rememberMe' name='rememberMe' type='checkbox'></input>
                        <label for='rememberMe'>Remember me</label>
                        <a href='www.google.com' target='blank'>Forgotten password?</a>
                    </div>
                    <Button
                        text='Submit'
                    />
                </div>
                <div className='loginScreen-rightPanel registrationHover'>
                    <Register />
                </div>
            </div>
        </div >
    )
}

export default LoginScreen;