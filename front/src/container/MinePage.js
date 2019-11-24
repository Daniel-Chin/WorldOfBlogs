import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import BlogFlow from '../component/BlogFlow';
import { GET } from '../helper/api';
import Hat from '../component/Hat';

const MinePage = ({ unAuth, whoami }) => {
  const mine_index = useParams().index;

  const [blog, setBlog] = useState(null);
  const [to_dashboard, setTo_dashboard] = useState(false);

  const toDashboard = function () {
    setTo_dashboard(true);
  }

  useEffect(() => {
    if (blog === null) {
      let is_sub = true;
      GET('getMine', { params: {
        mine_index
      } }, unAuth).then((res) => {
        if (is_sub) {
          setBlog(res);
        }
      });
      return function () {
        is_sub = false;
      };
    }
  });

  if (to_dashboard) {
    return <Redirect to='/dashboard' />
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
      <BlogFlow 
        blog={blog} onFinish={toDashboard} editButton 
        mine_index={mine_index}
      />
    </div>
  );
};

export default MinePage;
