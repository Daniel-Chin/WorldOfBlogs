import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
import './App.css';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' render={AboutThis} />
      <Route exact path='/register' render={RegisterPage} />
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
