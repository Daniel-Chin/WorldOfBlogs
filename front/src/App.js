import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import AboutThis from './container/AboutThis';
import RegisterPage from './container/RegisterPage';
import LoginPage from './container/LoginPage';
import LogoutPage from './container/LogoutPage';
import ViewPage from './container/ViewPage';
import DashboardPage from './container/DashboardPage';
import UserPage from './container/UserPage';
import HistoryPage from './container/HistoryPage';
import MinePage from './container/MinePage';
import EditPage from './container/EditPage';
import NewPage from './container/NewPage';
import InvalidCookiePage from './container/InvalidCookiePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [whoami, setWhoami] = useState(null);
  const [invalid_cookie, unAuth] = useState(false);

  Modal.setAppElement('#root');

  if (invalid_cookie) {
    return (
      <Switch>
        <Route exact path='/invalid-cookie' render={InvalidCookiePage} />
        <Route>
          <Redirect to='/invalid-cookie' />
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path='/' render={AboutThis} />
      <Route exact path='/register'>
        <RegisterPage 
          whoami={whoami} unAuth={unAuth} setWhoami={setWhoami}
        />
      </Route>
      <Route exact path='/login' render={LoginPage} />
      <Route exact path='/logout' render={LogoutPage} />
      <Route exact path='/view' render={ViewPage} />
      <Route exact path='/dashboard' render={DashboardPage} />
      <Route exact path='/user/:username' render={UserPage} />
      <Route exact path='/history/:index' render={HistoryPage} />
      <Route exact path='/mine/:index' render={MinePage} />
      <Route exact path='/edit/:mine_index' render={EditPage} />
      <Route exact path='/new' render={NewPage} />
      <Route exact path='/invalid-cookie' render={InvalidCookiePage} />
      <Route>
        404 No such URL
      </Route>
    </Switch>
  );
};

export default App;
