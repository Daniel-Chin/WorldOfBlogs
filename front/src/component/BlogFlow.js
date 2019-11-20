import React, { useState } from 'react';
import BlogRead from './BlogRead';
import BlogRate from './BlogRate';
import BlogEnd from './BlogEnd';

const BlogFlow = ({ blog }) => {
  const [page, setPage] = useState('read'); // read | rate | end

  switch (page) {
    case 'read':
      return <BlogRead blog={blog} setPage={setPage} />;
    case 'rate':
      return <BlogRate setPage={setPage} />;
    case 'end':
      return <BlogEnd setPage={setPage} />;
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
