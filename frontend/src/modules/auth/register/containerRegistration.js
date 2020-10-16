import React, { useState, useCallback } from 'react';
import './style.scss';
import Input from '../../../components/basic/Input/index';
import Button from '../../../components/basic/Button/index';

const RegistrationScreen = () => {
    const toggleRegistrationScreen = () => {
        // Logic behind Registration pannel toggling
        document.getElementsByClassName('loginScreen-rightPanel')[0].classList.toggle('registrationHover');
        document.getElementsByClassName('loginScreen-rightPanel')[0].classList.toggle('registrationFocused');
        document.getElementsByClassName('registerScreen-leftPanel')[0].classList.toggle('togglePanel');
        document.getElementsByClassName('registerScreen-mainPanel')[0].classList.toggle('hidden');
        document.getElementsByClassName('registerScreen-rightPanel')[0].classList.toggle('hidden');
    }
    const validateUser = () => {
        // TODO: Check whether user already exists
        // TODO: User registration logic
    }
    // Init state variables
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Callback function which calls the textChanges from the Input basic component
    const usernameChanged = useCallback(e => setUsername(e.target.value), []);
    const emailChanged = useCallback(e => setEmail(e.target.value), []);
    const passwordChanged = useCallback(e => setPassword(e.target.value), []);
    const confirmPasswordChanged = useCallback(e => setConfirmPassword(e.target.value), []);

    return (
        <div className='container-registerScreen'>
            <div className='registerScreen'>
                <div onClick={toggleRegistrationScreen} className='registerScreen-leftPanel'>
                    <h1>register</h1>
                </div>
                <div className='registerScreen-mainPanel hidden'>
                    <div className='registerScreenInputs'>
                        <label>username
                        <Input
                                value={username || ''}
                                onChange={usernameChanged}
                                type='text'
                                width={'100%'}
                                fontSize={'1.6em'}
                                borderRadius={'5px'}
                                padding={'5px'}
                                // validation for maximum num of allowed characters
                                maxCharacterCount={20}
                                withCharacterCount={true}
                            /></label>
                        <label>email
                        <Input
                                value={email || ''}
                                onChange={emailChanged}
                                type='email'
                                width={'100%'}
                                fontSize={'1.6em'}
                                borderRadius={'5px'}
                                padding={'5px'}
                                maxCharacterCount={30}
                                withCharacterCount={true}
                            /></label>
                        <label>password
                        <Input
                                value={password || ''}
                                onChange={passwordChanged}
                                type='password'
                                width={'100%'}
                                fontSize={'1.6em'}
                                borderRadius={'5px'}
                                padding={'5px'}
                                maxCharacterCount={255}
                                withCharacterCount={true}
                            /></label>
                        <label>confirm password
                        <Input
                                value={confirmPassword || ''}
                                onChange={confirmPasswordChanged}
                                width={'100%'}
                                fontSize={'1.6em'}
                                borderRadius={'5px'}
                                type='password'
                                padding={'5px'}
                                maxCharacterCount={255}
                                withCharacterCount={true}
                            /></label>
                        <Button
                            text={'register'}
                            onClick={validateUser}
                            borderRadius={'5px'}
                            height={'4.5vh'}
                            width={'100%'}
                            textTransform={'uppercase'}
                            fontSize={'1.05em'}
                        />
                    </div>
                </div>
                <div className='registerScreen-rightPanel hidden'>
                    <Button
                        text={'X'}
                        onClick={toggleRegistrationScreen}
                        width={'40%'}
                        borderRadius={'50%'}
                        fontSize={'0.9em'}
                    />
                </div>
            </div>
        </div>
    )
}

export default RegistrationScreen;