import React from 'react';
import { Link } from 'react-router-dom';

const AboutThis = () => {
  return (
    <div className='centerAlign' style={{
      marginBottom: '30px',
    }}>
      <h1>World of Blogs</h1>
      <p>
        Facebook, YouTube, Twitter... <br />
        They always show us <br />
        what we like to see. 
      </p>
      <p>
        It is easy to live in a bubble <br />
        where all we see and hear <br />
        feels right to us. 
      </p>
      <p>
        Little by little, <br />
        we start to forget <br />
        that there exists another side <br />
        of the story. <br />
        We start to forget <br />
        how to empathize <br />
        with people of different minds. 
      </p>
      <p>
        It is time we stop. 
      </p>
      <p>
        In <b>World of Blogs</b>, <br />
        you can't choose what to read. <br />
        We show you <br />
        completely random blogs  <br/>
        written by <br />
        completely random authors. <br/>
        You shall read the unbiased world, <br />
        one blog at a time. 
      </p>
      <Link to='/view'>
        <div className='button blueButton' tabIndex={0}>
          Start
        </div>
      </Link>
    </div>
  );
};

export default AboutThis;
