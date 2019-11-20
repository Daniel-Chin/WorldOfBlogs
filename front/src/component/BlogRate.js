import React, { useState } from 'react';
import { enterMeansClick } from '../helper/misc';
import FloatIn from './FloatIn';
import { GET } from '../helper/api';
import MobilePad from './MobilePad';

const BlogRate = ({ setPage, setMy_opinion }) => {
  const [stage, setStage] = useState(0);
  const [submit, setSubmit] = useState(false);

  const nextStage = function () {
    setStage(stage + 1);
  }

  const giveOpinion = (opinion) => {
    GET('rate', { params: { opinion } }).then((res) => {
      if (res === 'ok') {
        setMy_opinion(opinion);
        setPage('end');
      } else {
        console.error(`Rating "${opinion}" got response:`);
        console.log({ res });
        setSubmit('Error. Please refresh the page. ');
      }
    });
    setSubmit('Submitting...');
  };
  const like = giveOpinion.bind(null, 'like');
  const hate = giveOpinion.bind(null, 'hate');
  const noOpinion = giveOpinion.bind(null, 'none');

  const backToRead = function () {
    setPage('read');
  };

  return (
    <div className='pad1020 centerAlign'>
      <MobilePad />
      {submit ? 
        submit
      :
        <>
          <FloatIn show={stage >= 0} onEnd={nextStage}>
            <p>
              How was the blog?
            </p>
            <div 
              className='button greenButton ml-3 mr-3 mb-1' tabIndex={0}
              onClick={like} onKeyUp={enterMeansClick(like)}
            >
              Good
            </div>
            <div 
              className='button redButton ml-3 mr-3' tabIndex={0}
              onClick={hate} onKeyUp={enterMeansClick(hate)}
            >
              Bad
            </div>
            <br />
          </FloatIn>
          <FloatIn show={stage >= 1} wait={1500}>
            <div 
              className='button mt-3' tabIndex={0}
              onClick={noOpinion} onKeyUp={enterMeansClick(noOpinion)}
            >
              I have no opinion
            </div>
            <br />
            <p 
              className='underlink mt-3' tabIndex={0}
              onClick={backToRead} onKeyUp={enterMeansClick(backToRead)}
            >
              Read again
            </p>
          </FloatIn>
        </>
      }
    </div>
  );
};

export default BlogRate;
