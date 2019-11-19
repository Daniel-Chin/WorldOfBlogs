import React from 'react';
import { Redirect } from 'react-router-dom';
import Hat from '../component/Hat';
import { enterMeansClick } from '../helper/misc';
import { GET } from '../helper/api';

const LogoutPage = ({ whoami, setWhoami, unAuth }) => {
  const logout = () => {
    GET('user/logout', {}, unAuth).then(() => {
      setWhoami(null);
    });
  };

  const forgotPassword = function () {
    alert('I guess you just have to never sign out.');
  };

  if (! whoami) {
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
