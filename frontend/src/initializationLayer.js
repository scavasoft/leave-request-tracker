import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './modules/dashboard/index';
import Requests from './modules/leaves/index';
import Login from './modules/auth/login/index';
import NotFound from './components/NotFound/index';
import { connect } from "react-redux";

const mapStateToProps = state => ({
    isLoggedIn: state.authReducer.isLoggedIn,
    user: state.authReducer.user,
});
class InitializationLayer extends React.Component {

    render() {

        const { isLoggedIn, user } = this.props;

        const authority = user.authority;

        let isAdmin = true;
        if(authority === 'ADMIN') isAdmin = true;

        return (
            <div>
                <Router >
                    <Switch>
                        <Route path='/' exact component={Login} />
                        {isAdmin && <Route path='/requests' component={Requests} />}
                        {/* if isAdmin is set to true, the user will be able to visit the /requests, no matter
                        whether the Requests is displayed in the menu or not. */}
                        {isLoggedIn && <Route path='/dashboard' component={Dashboard} />}
                        {/* All invalid address inputs will be redirected towards the NotFound component. */}
                        <Route component={Login} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default connect(mapStateToProps)(InitializationLayer);