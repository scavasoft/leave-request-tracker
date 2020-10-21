import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './modules/dashboard/index';
import Requests from './modules/leaves/index';
import Login from './modules/auth/login/index';
import NotFound from './components/NotFound/index';

class InitializationLayer extends React.Component {

    render() {

        let isLogged = false; // boolean to check whether the user is logged in or not (refactor)
        if (localStorage.getItem('token') !== null) {
            isLogged = true;
        }
        const isAdmin = true; // boolean to check whether the current user has admin privilege (refactor)

        return (
            <div>
                <Router >
                    <Switch>
                        <Route path='/' exact component={Login} />
                        {isAdmin && <Route path='/requests' component={Requests} />}
                        {/* if isAdmin is set to true, the user will be able to visit the /requests, no matter
                        whether the Requests is displayed in the menu or not. */}
                        {isLogged && <Route path='/dashboard' component={Dashboard} />}
                        {/* All invalid address inputs will be redirected towards the NotFound component. */}
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default InitializationLayer;