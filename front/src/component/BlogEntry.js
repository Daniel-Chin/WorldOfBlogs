import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { enterMeansClick } from '../helper/misc';
import { GET } from '../helper/api';
import FloatIn from './FloatIn';

const BlogEntry = ({ index, blog, type, unAuth }) => {
  const [right_visible, setRight_visible] = useState(false);
  const [del_stage, setDel_stage] = useState('none');

  useEffect(() => {
    if (del_stage === 'deleting') {
      let is_sub = true;
      GET('delBlog', { params: {
        mine_index: index, 
      }}, unAuth).then(() => {
        if (is_sub) {
          setDel_stage('deleted');
        }
      });
      return function () {
        is_sub = false;
      };
    }
  }, [del_stage, setDel_stage, unAuth, index]);

  const mouseIn = function () {
    setRight_visible(true);
  };
  const mouseOut = function () {
    setRight_visible(false);
  };

  const deleteBlog = function () {
    if (del_stage === 'asking') {
      setDel_stage('deleting');
    } else {
      setDel_stage('asking');
    }
  };

  const closeModal = function () {
    setDel_stage('none');
    setRight_visible(false);
  };

  if (blog === false || del_stage === 'deleted') {
    return (
      <span>--- DELETED ---</span>
    );
  }

  if (del_stage === 'deleting') {
    return (
      <span>Deleting...</span>
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
        onFocus={mouseIn} onBlur={mouseOut}
      >
        <Modal
          isOpen={del_stage === 'asking'}
          onRequestClose={closeModal}
          style={{
            content: {
              padding: 0, 
              borderRadius: '10px',
              textAlign: 'center',
            }, 
          }}
          contentLabel="Confirm Deletion Modal"
        >
          <h3 className='errorModalHead'>Confirm Deletion</h3>
          <div className='pad1020'>
            <p>
              Do you really want to delete "{blog.title}"? 
            </p>
            <FloatIn wait={1000} show>
              <div 
                className='button redButton m-3' tabIndex={0}
                onClick={deleteBlog} onKeyUp={enterMeansClick(deleteBlog)}
              >
                Delete
              </div>
              <div 
                className='button grayButton m-3' tabIndex={0}
                onClick={closeModal} onKeyUp={enterMeansClick(closeModal)}
              >
                Cancel
              </div>
            </FloatIn>
          </div>
        </Modal>
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
              <Link to={'/edit/' + index} className='button smallButton greenButton'>
                <FontAwesomeIcon icon={faPen} />
              </Link>
              <div 
                className='button smallButton redButton ml-1'
                tabIndex={0} onClick={deleteBlog} 
                onKeyUp={enterMeansClick(deleteBlog)}
              >
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
