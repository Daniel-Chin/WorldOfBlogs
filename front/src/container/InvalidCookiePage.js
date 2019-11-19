import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const InvalidCookiePage = ({ whoami, setWhoami, invalid_cookie, unAuth }) => {
  useEffect(() => {
    if (whoami) {
      setWhoami(null);
    }
  }, [whoami, setWhoami]);
  useEffect(() => {
    if (invalid_cookie) {
      unAuth(false);
    }
  }, [invalid_cookie, unAuth]);

  return (
    <div className='centerAlign mt-5'>
      <p>
        I hate to say this, but you are signed out. 
      </p>
      <Link to='/login' className='button blueButton'>
        Sign me in!
      </Link>
    </div>
  );
};

export default InvalidCookiePage;
