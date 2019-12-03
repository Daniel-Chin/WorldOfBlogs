import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import AboutThis from './container/AboutThis';
import RegisterPage from './container/RegisterPage';
import LoginPage from './container/LoginPage';
import LogoutPage from './container/LogoutPage';
import ViewPage from './container/ViewPage';
import MePage from './container/MePage';
import UserPage from './container/UserPage';
import HistoryPage from './container/HistoryPage';
import MinePage from './container/MinePage';
import EditPage from './container/EditPage';
import NewPage from './container/NewPage';
import ChangePasswordPage from './container/ChangePasswordPage';
import InvalidCookiePage from './container/InvalidCookiePage';
import { GET } from './helper/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [whoami, setWhoami] = useState(null);
  const [invalid_cookie, unAuth] = useState(false);
  const [did_try_login, setDid_try_login] = useState(false);

  useEffect(() => {
    if (! did_try_login) {
      setDid_try_login(true);
      GET('user/whoami', {}, 'do not unAuth').then((res) => {
        if (res) {
          setWhoami(res);
        }
      });
    }
  }, [did_try_login, setWhoami, setDid_try_login]);

  Modal.setAppElement('#root');

  if (invalid_cookie) {
    return (
      <Switch>
        <Route exact path='/invalid-cookie'>
          <InvalidCookiePage 
            whoami={whoami} setWhoami={setWhoami} 
            invalid_cookie={invalid_cookie} unAuth={unAuth}
          />
        </Route>
        <Route>
          <Redirect to='/invalid-cookie' />
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path='/'>
        <AboutThis whoami={whoami} />
      </Route>
      <Route exact path='/register'>
        <RegisterPage 
          whoami={whoami} unAuth={unAuth} setWhoami={setWhoami}
        />
      </Route>
      <Route exact path='/login'>
        <LoginPage whoami={whoami} setWhoami={setWhoami} />
      </Route>
      <Route exact path='/logout'>
        <LogoutPage whoami={whoami} setWhoami={setWhoami} unAuth={unAuth} />
      </Route>
      <Route exact path='/view'>
        <ViewPage whoami={whoami} unAuth={unAuth} />
      </Route>
      <Route exact path='/Me'>
        <MePage whoami={whoami} unAuth={unAuth} />
      </Route>
      <Route exact path='/user/:username'>
        <UserPage whoami={whoami} unAuth={unAuth} />
      </Route>
      <Route exact path='/history/:index'>
        <HistoryPage unAuth={unAuth} whoami={whoami} />
      </Route>
      <Route exact path='/mine/:index'>
        <MinePage unAuth={unAuth} whoami={whoami} />
      </Route>
      <Route exact path='/edit/:mine_index'>
        <EditPage unAuth={unAuth} />
      </Route>
      <Route exact path='/new'>
        <NewPage unAuth={unAuth} />
      </Route>
      <Route exact path='/invalid-cookie'>
        <InvalidCookiePage 
          whoami={whoami} setWhoami={setWhoami} 
          invalid_cookie={invalid_cookie} unAuth={unAuth}
        />
      </Route>
      <Route exact path='/changepassword'>
        <ChangePasswordPage unAuth={unAuth} whoami={whoami} />
      </Route>
      <Route>
        404 No such URL
      </Route>
    </Switch>
  );
};

export default App;
