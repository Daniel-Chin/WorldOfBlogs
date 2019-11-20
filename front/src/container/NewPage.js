// We use FloatIn wait=1000 So that you don't see anything if we are fast enough

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MobilePad from '../component/MobilePad';
import FloatIn from '../component/FloatIn';
import { GET } from '../helper/api';

const NewPage = ({ unAuth }) => {
  const [mine_index, setMine_index] = useState(null);

  useEffect(() => {
    if (mine_index === null) {
      GET('addBlog', {}, unAuth).then((res) => {
        setMine_index(JSON.parse(res));
      });
    }
  }, [mine_index, setMine_index, unAuth]);

  if (mine_index !== null) {
    return <Redirect to={`/edit/${mine_index}`} />
  }

  return (
    <div className='pad1020 centerAlign'>
      <MobilePad />
      <FloatIn show wait={1000}>
        <p className='mt-5'>
          Creating a blog...
        </p>
      </FloatIn>
    </div>
  );
};

export default NewPage;
