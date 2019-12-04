import React, { useState } from 'react';
import BlogRead from './BlogRead';
import BlogRate from './BlogRate';
import BlogEnd from './BlogEnd';

const BlogFlow = ({
  blog, onFinish, editButton, mine_index, do_rate, 
}) => {
  const [page, setPage] = useState('read'); // read | rate | end
  const [my_opinion, setMy_opinion] = useState(blog.my_opinion);

  switch (page) {
    case 'read':
      return <BlogRead 
        blog={blog} setPage={setPage} editButton={editButton} 
        mine_index={mine_index} do_rate={do_rate} onFinish={onFinish}
      />;
    case 'rate':
      return <BlogRate setPage={setPage} setMy_opinion={setMy_opinion} />;
    case 'end':
      return <BlogEnd onFinish={onFinish} my_opinion={my_opinion} />;
    default:
      break;
  }
  return (
    <p>
      This is bug #23047123452346
    </p>
  );
};

export default BlogFlow;
