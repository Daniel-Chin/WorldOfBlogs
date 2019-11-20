import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FloatIn from '../component/FloatIn';

const WAIT_TIME = 1000;

const AboutThis = () => {
  const [stage, setStage] = useState(0);

  const nextStage = function () {
    setStage(stage + 1);
  };

  return (
    <div className='centerAlign' style={{
      marginBottom: '30px',
    }}>
      <FloatIn show={stage >= 0} onEnd={nextStage}>
        <h1 className='mt-3'>World of Blogs</h1>
      </FloatIn>
      <FloatIn show={stage >= 1} onEnd={nextStage}>
      <p>
        Facebook, YouTube, Twitter... <br />
        They always show us <br />
        what we like to see. 
      </p>
      </FloatIn>
      <FloatIn show={stage >= 2} onEnd={nextStage} wait={WAIT_TIME}>
      <p>
        It is easy to live in a bubble <br />
        where all we see and hear <br />
        feels right to us. 
      </p>
      </FloatIn>
      <FloatIn show={stage >= 3} onEnd={nextStage} wait={WAIT_TIME}>
      <p>
        Little by little, <br />
        we start to forget <br />
        that there exists another side <br />
        of the story. <br />
        We start to forget <br />
        how to empathize <br />
        with people of different minds. 
      </p>
      </FloatIn>
      <FloatIn show={stage >= 4} onEnd={nextStage} wait={WAIT_TIME}>
      <p>
        It is time we stop. 
      </p>
      </FloatIn>
      <FloatIn show={stage >= 5} onEnd={nextStage} wait={WAIT_TIME}>
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
      </FloatIn>
      <FloatIn show={stage >= 6} onEnd={nextStage} wait={WAIT_TIME}>
      <Link to='/view'>
        <div className='button blueButton' tabIndex={0}>
          Start
        </div>
      </Link>
      </FloatIn>
    </div>
  );
};

export default AboutThis;
