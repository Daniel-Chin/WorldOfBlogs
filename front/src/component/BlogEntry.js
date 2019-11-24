import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

const BlogEntry = ({ index, blog, type }) => {
  const [right_visible, setRight_visible] = useState(false);

  const mouseIn = function () {
    setRight_visible(true);
  };
  const mouseOut = function () {
    setRight_visible(false);
  };

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
      <div 
        className='myBlogEntry' 
        onMouseEnter={mouseIn} onMouseLeave={mouseOut}
      >
        <div className='myBlogEntryLeft'>
          <div className='myBlogEntryLeftInner'>
            <Link to={'/mine/' + index}>
              {blog.title}
            </Link>
          </div>
        </div>
        <div className='myBlogEntryRight'>
          {right_visible &&
            <div className='myBlogEntryRightInner'>
              <div className='button smallButton greenButton'>
                <FontAwesomeIcon icon={faPen} />
              </div>
              <div className='button smallButton redButton ml-1'>
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          }
        </div>
        <div className='floatClear' />
        <br />
      </div>
    );
  }
};

export default BlogEntry;
