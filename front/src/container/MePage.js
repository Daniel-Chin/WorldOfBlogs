import React from 'react';
import { Link } from 'react-router-dom';
import Hat from '../component/Hat';
import BlogList from '../component/BlogList';

const MePage = ({ whoami, unAuth }) => {
  return (
    <>
      <Hat whoami={whoami} />
      <div className='centerAlign pad1020'>
      <h2>Yo, {whoami}</h2>
        <div>
          <Link className='button grayButton m-1' to={'/user/' + whoami}>
            View my public profile
          </Link>
          <br />
          <Link className='button grayButton m-1' to='/changepassword'>
            Change my password
          </Link>
        </div>
        <div>
          <div className='TwoColumn'>
            <div className='TwoColumnInner'>
              <div className='columnTitle'>
                <h3>I Wrote</h3>
              </div>
              <BlogList type='Mine' unAuth={unAuth} />
            </div>
          </div>
          <div className='TwoColumn'>
            <div className='TwoColumnInner'>
              <div className='columnTitle'>
                <h3>I Viewed</h3>
              </div>
              <BlogList type='History' unAuth={unAuth} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MePage;
