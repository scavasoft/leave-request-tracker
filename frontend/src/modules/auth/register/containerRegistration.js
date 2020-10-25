import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestRegistration } from '../../../reducers/authReducer';
import './style.scss';
import Input from '../../../components/basic/Input/index';
import Button from '../../../components/basic/Button/index';
import { createSelector } from 'reselect';

// Check if any errors exist and render them later on if they do.
const errorSelector = createSelector(
    store => store.authReducer.errors,
    store => store.authReducer.success,
    (errors, success) => ({
        errors,
        success,
    })
)
const RegistrationScreen = () => {

    const dispatch = useDispatch();

    const toggleRegistrationScreen = () => {
        // Logic behind Registration pannel toggling
        document.getElementsByClassName('loginScreen-rightPanel')[0].classList.toggle('registrationHover');
        document.getElementsByClassName('loginScreen-rightPanel')[0].classList.toggle('registrationFocused');
        document.getElementsByClassName('registerScreen-leftPanel')[0].classList.toggle('togglePanel');
        document.getElementsByClassName('registerScreen-mainPanel')[0].classList.toggle('hidden');
        document.getElementsByClassName('registerScreen-rightPanel')[0].classList.toggle('hidden');
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

    // Using destructuring to store the selectors from the errorSelector.
    const { errors, success } = useSelector(errorSelector);

    const handleRegister = event => {
        event.preventDefault();
        dispatch(requestRegistration({
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        }, [username, email, password, confirmPassword]))
    };

    return (
        <div className='container-registerScreen'>
            <div className='registerScreen'>
                <div onClick={toggleRegistrationScreen} className='registerScreen-leftPanel'>
                    <h1>register</h1>
                </div>
                <div className='registerScreen-mainPanel hidden'>
                    <form className='registerScreen-inputs'>
                        <label><span>username</span>
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
                        {errors.hasOwnProperty('username') && (
                            <div className='error'>{errors['username']}</div>
                        )}
                        <label><span>email</span>
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
                        {errors.hasOwnProperty('email') && (
                            <div className='error'>{errors['email']}</div>
                        )}
                        <label><span>password</span>
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
                        {errors.hasOwnProperty('password') && (
                            <div className='error'>{errors['password']}</div>
                        )}
                        <label><span>confirm password</span>
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
                        {errors.hasOwnProperty('user') &&
                            <div className='error'>{errors['user']}</div>
                        }

                        {errors.hasOwnProperty('error') &&
                            <div className='error'>{errors['error']}</div>
                        }

                        {Object.keys(success).length > 0 &&
                            <div className='success'>{Object.values(success)}</div>
                        }
                        <Button
                            text={'register'}
                            onClick={handleRegister}
                            borderRadius={'5px'}
                            height={'4.5vh'}
                            width={'100%'}
                            textTransform={'uppercase'}
                            fontSize={'1.05em'}
                        />
                    </form>
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