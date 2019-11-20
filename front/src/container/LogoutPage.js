import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Hat from '../component/Hat';
import FloatIn from '../component/FloatIn';
import { enterMeansClick } from '../helper/misc';
import { GET } from '../helper/api';

const WAIT_TIME = 1000;

const LogoutPage = ({ whoami, setWhoami, unAuth }) => {
  const [stage, setStage] = useState(0);

  const nextStage = function () {
    setStage(stage + 1);
  };

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
      <FloatIn show={stage >= 0} onEnd={nextStage}>
      <h2 className='mt-3'>Signing Out</h2>
      </FloatIn>
      <FloatIn show={stage >= 1} onEnd={nextStage}>
      <p>
        Pop quiz: <i>do you still remember your password? </i> 
      </p>
      </FloatIn>
      <FloatIn show={stage >= 2} onEnd={nextStage} wait={WAIT_TIME}>
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
      </FloatIn>
    </div>
  );
};

export default LogoutPage;
