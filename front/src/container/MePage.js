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
          <Link to={'/user/' + whoami}>
            <span className='button grayButton m-1' tabIndex={0}>
              View my public profile
            </span>
          </Link>
          <br />
          <Link to='/changepassword'>
            <span className='button grayButton m-1' tabIndex={0}>
              Change my password
            </span>
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
