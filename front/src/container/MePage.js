import React from 'react';
import { Link } from 'react-router-dom';
import Hat from '../component/Hat';

const MePage = ({ whoami }) => {
  return (
    <>
      <Hat whoami={whoami} />
      <div className='centerAlign pad1020'>
      <h2>Yo, {whoami}</h2>
        <div>
          <Link to={'/user/' + whoami}>
            <span className='button grayButton m-1' tabIndex={0}>
              View my public profile
            </span>
          </Link>
          <Link to='/changepassword'>
            <span className='button grayButton m-1' tabIndex={0}>
              Change my password
            </span>
          </Link>
        </div>

      </div>
    </>
  );
};

export default MePage;
