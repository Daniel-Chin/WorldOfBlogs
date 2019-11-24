import React, { useState, useEffect } from 'react';
import { GET } from '../helper/api';
import BlogEntry from './BlogEntry';

const BlogList = ({ type, unAuth }) => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    if (blogs === null) {
      let is_sub = true;
      GET('list' + type, {}, unAuth).then((res) => {
        if (is_sub && res) {
          setBlogs(res);
        }
      });
      return function () {
        is_sub = false;
      };
    }
  }, [blogs, setBlogs, type, unAuth]);

  if (blogs === null) {
    return (
      <div className='centerAlign mt-2'>
        Loading...
      </div>
    );
  }

  return blogs.map((blog, i) => (
    <div key={i}>
      <BlogEntry index={i.toString()} blog={blog} type={type} />
    </div>
  ));
};

export default BlogList;
