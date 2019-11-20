import React from 'react';
import { Link } from 'react-router-dom';
import FloatIn from './FloatIn';
import { enterMeansClick } from '../helper/misc';
import MobilePad from './MobilePad';

const BlogEnd = ({ reset, my_opinion }) => {
  return (
    <div className='pad1020 centerAlign'>
      <MobilePad />
      <FloatIn show>
        <p className='mt-3'>
          I'm glad you {' '}
          <span style={{
            color: {
              like: '#080', 
              hate: '#800', 
              none: 'black', 
            }[my_opinion], 
            fontWeight: "bold", 
          }}>
            {{
              like: 'liked that.', 
              hate: 'hate that.', 
              none: `don't care.`, 
            }[my_opinion]}
          </span>
        </p>
        <div 
          className='button blueButton mb-3' tabIndex={0}
          onClick={reset} onKeyUp={enterMeansClick(reset)}
        >
          Ok, next blog
        </div>
        <br />
        <div className='smaller'>
          <Link to='/dashboard'>
            <div 
              className='button mb-2' tabIndex={0}
            >
              My Dashboard
            </div>
          </Link>
          <br />
          <Link to='/new'>
            <div 
              className='button' tabIndex={0}
            >
              Write a Blog
            </div>
          </Link>
        </div>
      </FloatIn>
    </div>
  );
};

export default BlogEnd;
