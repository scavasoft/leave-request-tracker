import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";
import Dashboard from './modules/dashboard/index';
import Requests from './modules/leaves/index';
import Login from './modules/auth/login/index';
import history from './utils/history';
import { getUserByToken } from './reducers/authReducer';

class InitializationLayer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUserByToken();
    }

    render() {

        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route path='/' exact component={Login} />
                        {this.props.user.authority === 'ADMIN' && <Route path='/requests' component={Requests} />}
                        {/* if isAdmin is set to true, the user will be able to visit the /requests, no matter
                        whether the Requests is displayed in the menu or not. */}
                        {this.props.isLoggedIn && <Route path='/dashboard' component={Dashboard} />}

                        <Route component={Login} />
                    </Switch>
                </Router>
            </div>
        )
    }
}
const mapStateToProps = ({ authReducer: { isLoggedIn, user }}) => ({
    isLoggedIn,
    user
});

const mapDispatchToProps = {
    getUserByToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(InitializationLayer);