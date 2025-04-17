import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProviderPanel from './pages/ProviderPanel';
import UserProfile from './pages/UserProfile';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/provider-panel" component={ProviderPanel} />
                <Route path="/user-profile" component={UserProfile} />
            </Switch>
        </Router>
    );
};

export default Routes;