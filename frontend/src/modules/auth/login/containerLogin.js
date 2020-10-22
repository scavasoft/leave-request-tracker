import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin } from '../../../reducers/authReducer';
import { createSelector } from 'reselect';
import { Link } from 'react-router-dom';
import './style.scss';
import Input from '../../../components/basic/Input/index';
import Button from '../../../components/basic/Button/index';
import Register from '../register/index';

// An errorSelector to capture and store a list of errors
const errorSelector = createSelector(
    store => store.authReducer.errors,
    (errors) => ({
        errors
    })
)
const LoginScreen = () => {

    const dispatch = useDispatch();

    // Init state variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Callback function which calls the textChanges from the Input basic component
    const nameChanged = useCallback(e => setUsername(e.target.value), []);
    const passwordChanged = useCallback(e => setPassword(e.target.value), []);

    // Destructuring the errors from the errorSelector
    const { errors } = useSelector(errorSelector);

    const handleLogin = () => {
        dispatch(requestLogin({
            username: username,
            password: password,
        }, [username, password]))
    };

    return (
        <div className='container-loginScreen'>
            <div className='loginScreen'>
                <form className='loginScreen-leftPanel'>
                    <h1>login</h1>
                    <div className='loginScreen-inputs'>
                        <label>username
                        <Input
                                value={username || ''}
                                onChange={nameChanged}
                                width={'100%'}
                                borderRadius={'5px'}
                                padding={'0.3em'}
                                type='text'
                                margin={'5px 0px 2em 0px'}
                            /></label>
                        {errors.hasOwnProperty('error') && (
                            <div className='error'>{errors['error']}</div>
                        )}
                        <label>password
                        <Input
                                value={password || ''}
                                onChange={passwordChanged}
                                width={'100%'}
                                borderRadius={'5px'}
                                padding={'0.3em'}
                                type='password'
                                margin={'5px 0px 2em 0px'}
                            /></label>
                    </div>
                    <div className='loginScreen-extras'>
                        <input id='rememberMe' name='rememberMe' type='checkbox'></input>
                        <label for='rememberMe'>Remember me</label>
                        <a href='www.google.com' target='blank'>Forgotten password?</a>
                    </div>
                    <Link to='/dashboard' onClick={handleLogin} style={{ textDecoration: 'none' }}>
                        <Button
                            text={'Submit'}
                            borderRadius={'5px'}
                            width={'65%'}
                            height={'4.5vh'}
                            textTransform={'uppercase'}
                            fontSize={'1.05em'}
                            margin={'0 auto'}
                        />
                    </Link>
                </form>
                <div className='loginScreen-rightPanel registrationHover'>
                    <Register />
                </div>
            </div>
        </div >
    )
}

export default LoginScreen;