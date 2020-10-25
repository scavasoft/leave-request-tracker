import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { requestLogin } from '../../../reducers/authReducer';
import { createSelector } from 'reselect';
import { Link } from 'react-router-dom';
import Input from '../../../components/basic/Input/index';
import Button from '../../../components/basic/Button/index';
import './style.scss';
import Register from '../register/index';

// An errorSelector to capture and store a list of errors
const selector = createSelector(
    store => store.authReducer.logInErrors,
    (logInErrors) => ({
        logInErrors,
    })
)
const LoginScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // Init state variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Callback function which calls the textChanges from the Input basic component
    const nameChanged = useCallback(e => setUsername(e.target.value), []);
    const passwordChanged = useCallback(e => setPassword(e.target.value), []);

    // Destructuring the errors from the errorSelector
    const { logInErrors } = useSelector(selector);

    const handleLogin = () => {
        dispatch(requestLogin({
            username: username,
            password: password,
        }, [username, password]))

        history.push(`/dashboard`);
    };

    return (
        <div className='container-loginScreen'>
            <div className='loginScreen'>
                <form className='loginScreen-leftPanel'>
                    <h1>login</h1>
                    <div className='loginScreen-inputs'>
                        <div className='loginScreen-inputs-username'>
                            <label><span>username</span>
                                <Input
                                    value={username || ''}
                                    onChange={nameChanged}
                                    width={'100%'}
                                    borderRadius={'5px'}
                                    padding={'0.3em'}
                                    type='text'
                                    margin={'5px 0px 2em 0px'}
                                /></label>
                            {logInErrors.hasOwnProperty('error') &&
                                <div className='error'>{logInErrors['error']}</div>
                            }
                        </div>
                        <div className='loginScreen-inputs-password'>
                            <label><span>password</span>
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
                    </div>
                    <Link to={'/dashboard'} style={{ textDecoration: 'none' }}>
                        <Button
                            onClick={handleLogin}
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