import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RendererDashboard from './modules/dashboard/index';
import Requests from './modules/leaves/index';
import Login from './modules/auth/login/index';
import Register from './modules/auth/register/index';

class InitializationLayer extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact component={RendererDashboard} />
                    <Route path='/requests' component={Requests} />
                    {/* Login & Register */}
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                </Switch>
            </Router>
        )
    }
}

export default InitializationLayer;