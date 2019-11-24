import React, { useState } from 'react';
import BlogRead from './BlogRead';
import BlogRate from './BlogRate';
import BlogEnd from './BlogEnd';

const BlogFlow = ({ blog, reset }) => {
  // const [page, setPage] = useState('read'); // read | rate | end
  const [page, setPage] = useState('end'); // read | rate | end
  const [my_opinion, setMy_opinion] = useState(blog.my_opinion);

  switch (page) {
    case 'read':
      return <BlogRead blog={blog} setPage={setPage} />;
    case 'rate':
      return <BlogRate setPage={setPage} setMy_opinion={setMy_opinion} />;
    case 'end':
      return <BlogEnd reset={reset} my_opinion={my_opinion} />;
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
