import React from 'react';
import './style.scss';
import Input from '../../../components/basic/Input/index';
import Button from '../../../components/basic/Button/index';

const RegistrationScreen = () => {
    const toggleRegistrationScreen = () => {
        document.getElementsByClassName('loginScreen-rightPanel')[0].classList.toggle('registrationHover');
        document.getElementsByClassName('loginScreen-rightPanel')[0].classList.toggle('registrationFocused');
        document.getElementsByClassName('registerScreen-leftPanel')[0].classList.toggle('togglePanel');
        document.getElementsByClassName('registerScreen-mainPanel')[0].classList.toggle('hidden');
        document.getElementsByClassName('registerScreen-rightPanel')[0].classList.toggle('hidden');
    }
    return (
        <div className='container-registerScreen'>
            <div className='registerScreen'>
                <div onClick={toggleRegistrationScreen} className='registerScreen-leftPanel'>
                    <h1>register</h1>
                </div>
                <div className='registerScreen-mainPanel hidden'>
                    <div className='registerScreenInputs'>
                        <label>username</label>
                        <Input
                            label=''
                            type='text'
                        />
                        <label>email</label>
                        <Input
                            label=''
                            type='text'
                        />
                        <label>password</label>
                        <Input
                            label=''
                            type='password'
                        />
                        <label>confirm password</label>
                        <Input
                            label=''
                            type='password'
                        />
                        <Button
                            text='register'
                        // padding prop doesn't work
                        // padding={520}
                        />
                    </div>
                </div>
                <div className='registerScreen-rightPanel hidden'>
                    <button onClick={toggleRegistrationScreen}>X</button>
                </div>
            </div>
        </div>
    )
}

export default RegistrationScreen;