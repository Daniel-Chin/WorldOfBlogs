import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import FloatIn from './FloatIn';
import { enterMeansClick } from '../helper/misc';
import MobilePad from './MobilePad';

const BlogEnd = ({ onFinish, my_opinion }) => {
  return (
    <div className='pad1020 centerAlign'>
      <MobilePad />
      <FloatIn show>
        <div className='mt-3 mb-3'>
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
              hate: 'hated that.', 
              none: `don't care.`, 
            }[my_opinion]}
          </span>
          <br />
          <FontAwesomeIcon 
            icon={faQuestionCircle} className='tiptool opinionTip' 
            data-tip='You may not change your opinion.'
          />
          <ReactTooltip 
            effect='solid' className='tooltip'
          />
        </div>
        <div 
          className='button blueButton mb-3' tabIndex={0}
          onClick={onFinish} onKeyUp={enterMeansClick(onFinish)}
        >
          Ok. Next Blog
        </div>
        <br />
        <div className='smaller'>
          <Link to='/new'>
            <div 
              className='button' tabIndex={0}
            >
              Write a Blog
            </div>
          </Link>
          <br />
        </div>
      </FloatIn>
    </div>
  );
};

export default BlogEnd;
