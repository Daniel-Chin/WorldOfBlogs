import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hat from '../component/Hat';
import BlogFlow from '../component/BlogFlow';
import { GET } from '../helper/api';
import { enterMeansClick } from '../helper/misc';
import FloatIn from '../component/FloatIn';

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
        <FloatIn show>
          <p className='mt-5'>
            It is very important that you 
          </p>
          <Link to='/register'>
            <div className='button blueButton'>
              Sign Up First
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
      <BlogFlow blog={blog} />
    </div>
  );
};

export default ViewPage;
