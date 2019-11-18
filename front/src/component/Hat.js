import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const Hat = ({ whoami }) => {
  return (
    <div className='Hat'>
      <Link to='/view' className='Link floatLeft' style={{
        fontSize: '24px',
      }}>
        World of Blogs
      </Link>
      {whoami &&
        <div className='floatRight'>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size='sm'>
              {whoami}
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight>
              <Dropdown.Item href="#/view">World of Blogs</Dropdown.Item>
              <Dropdown.Item href="#/dashboard">Dashboard</Dropdown.Item>
              <Dropdown.Item href="#/new">Write a Blog</Dropdown.Item>
              <Dropdown.Item href="#/logout">Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      }
      <div className='floatClear' />
    </div>
  );
};

export default Hat;
