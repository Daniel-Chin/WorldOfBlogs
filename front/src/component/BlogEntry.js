import React from 'react';
import { Link } from 'react-router-dom';

const BlogEntry = ({ index, blog, type }) => {
  if (blog === false) {
    return (
      <span>--- DELETED ---</span>
    );
  }

  if (type === 'History') {
    return (
      <div className='BlogEntry'>
        <div className='BlogEntryLeft'>
          <Link to={'/history/' + index}>
            {blog.title}
          </Link>
        </div>
        <div className='BlogEntryMiddle'>
        </div>
        <div className='BlogEntryRight'>
          <Link className='floatRight' to={'/user/' + blog.owner}>
            {blog.owner}
          </Link>
        </div>
        <div className='floatClear' />
      </div>
    );
  }

  if (type === 'Mine') {
    return (
      <Link to={'/mine/' + index}>
        {blog.title}
      </Link>
    );
  }
};

export default BlogEntry;
