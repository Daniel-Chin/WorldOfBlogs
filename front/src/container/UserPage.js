import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import Hat from '../component/Hat';
import FloatIn from '../component/FloatIn';
import MobilePad from '../component/MobilePad';
import { GET } from '../helper/api';

const UserPage = ({ whoami, unAuth }) => {
  const them = useParams().username;
  const [n_blogs, setN_blogs] = useState(null);

  useEffect(() => {
    if (n_blogs === null) {
      let is_sub = true;
      GET('user/get', { params: {
        username: them, 
      } }, unAuth).then((res) => {
        if (is_sub) {
          if (res) {
            setN_blogs(res.n_blogs);
          } else {
            alert('Are you sure you are not hacking my website?');
          }
        }
      });
      return function () {
        is_sub = false;
      };
    }
  }, [n_blogs, setN_blogs, them, unAuth]);

  return (
    <>
      <Hat whoami={whoami} />
      <div className='centerAlign pad1020'>
        <FloatIn show>
          <h2 className='mb-5'>
            Profile of <i>{them}</i>
          </h2>
          <MobilePad />
          {n_blogs === null ?
            <FloatIn wait={1000} show>
              Loading...
            </FloatIn>
          :
            <FloatIn show>
              <div>
                They have written {n_blogs} blog{n_blogs !== 1 && 's'}. 
                {' '}
                <FontAwesomeIcon 
                  icon={faQuestionCircle} className='tiptool' 
                  data-tip='You may not see their blogs. You may only know the total count.'
                  />
                <ReactTooltip 
                  effect='solid' className='tooltip'
                />
              </div>
            </FloatIn>
          }
        </FloatIn>
      </div>
    </>
  );
};

export default UserPage;
