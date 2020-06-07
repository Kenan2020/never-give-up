import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import ProfileForm from '../profile-forms/ProfileForm';
import UserProfile from '../profile-forms/UserProfile';


import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import Google from '../auth/Google';
import Facebook from '../auth/Facebook';


const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/googlecheck" component={Google} />
        <Route exact path="/facebookcheck" component={Facebook} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/userprofile" component={UserProfile} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
