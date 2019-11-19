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
            <Dropdown.Toggle className='button whiteButton' variant='outline-light' size='sm'>
              {whoami}
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight>
              <Dropdown.Item className='button whiteButton' href="#/view">World of Blogs</Dropdown.Item>
              <Dropdown.Item className='button whiteButton' href="#/dashboard">Dashboard</Dropdown.Item>
              <Dropdown.Item className='button whiteButton' href="#/new">Write a Blog</Dropdown.Item>
              <Dropdown.Item className='button whiteButton' href="#/logout">Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      }
      <div className='floatClear' />
    </div>
  );
};

export default Hat;
