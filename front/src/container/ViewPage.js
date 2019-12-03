import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hat from '../component/Hat';
import BlogFlow from '../component/BlogFlow';
import { GET } from '../helper/api';
import { enterMeansClick } from '../helper/misc';
import FloatIn from '../component/FloatIn';
import MobilePad from '../component/MobilePad';

const ViewPage = ({ whoami, unAuth }) => {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (whoami && blog === null) {
      GET('view', {}, unAuth).then((res) => {
        setBlog(res);
      });
    }
  }, [blog, setBlog, unAuth, whoami]);

  const reset = function () {
    setBlog(null);
  };

  if (! whoami) {
    return (
      <div className='centerAlign'>
        <Hat whoami={whoami} />
        <MobilePad />
        <FloatIn show>
          <p className='mt-5'>
            <b>You shall not read any blogs</b> unless you
          </p>
          <Link to='/register'>
            <div className='button blueButton'>
              Sign Up 
            </div>
          </Link>
        </FloatIn>
      </div>
    );
  }

  if (blog === false) {
    return (
      <div className='centerAlign'>
        <Hat whoami={whoami} />
        <p className='mt-5'>
          World of Blog appreciates your viewing. 
        </p>
        <div 
          className='button' tabIndex={0}
          onClick={reset} onKeyUp={enterMeansClick(reset)}
        >
          "You are welcome."
        </div>
      </div>
    );
  }

  if (blog === null) {
    return (
      <div>
        <Hat whoami={whoami} />
      </div>
    );
  }

  return (
    <div>
      <Hat whoami={whoami} />
      <BlogFlow blog={blog} onFinish={reset} />
    </div>
  );
};

export default ViewPage;
