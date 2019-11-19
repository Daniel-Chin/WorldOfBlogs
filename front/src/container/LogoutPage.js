import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Hat from '../component/Hat';
import { enterMeansClick } from '../helper/misc';
import { GET } from '../helper/api';

const LogoutPage = ({ whoami, setWhoamim, unAuth }) => {
  const [logged_out, setLogged_out] = useState(false);

  const logout = () => {
    GET('user/logout', {}, unAuth).then(() => {
      setLogged_out(true);
    });
  };

  const forgotPassword = function () {
    alert('I guess you just have to never sign out.');
  };

  if (logged_out) {
    return <Redirect to='/' />
  }

  return (
    <div className='centerAlign'>
      <Hat whoami={whoami} />
      <h2 className='mt-3'>Signing Out</h2>
      <p>
        Pop quiz: <i>do you still remember your password? </i> 
      </p>
      <p className='underlink' tabIndex={0} 
        onClick={forgotPassword} onKeyUp={enterMeansClick(forgotPassword)}
      >
        Damn. I forgot my password...
      </p>
      <div 
        className='button redButton' tabIndex={1}
        onClick={logout} onKeyUp={enterMeansClick(logout)}
      >
        Confirm Sign Out
      </div>
    </div>
  );
};

export default LogoutPage;
