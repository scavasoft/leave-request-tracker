import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './modules/dashboard/index';
import Requests from './modules/leaves/index';
import Login from './modules/auth/login/index';
import NotFound from './components/NotFound/index';


class InitializationLayer extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact component={Login} />
                    <Route path='/requests' component={Requests} />
                    <Route path='/dashboard' component={Dashboard} />
                    {/* All invalid address inputs will be redirected towards the NotFound component. */}
                    <Route component={NotFound} />
                </Switch>
            </Router>
        )
    }
}

export default InitializationLayer;