import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import FloatIn from './FloatIn';
import TypeWriter from './TypeWriter';
import { formatTime, enterMeansClick } from '../helper/misc';
import { parseText, estimateReadTimeForText } from '../helper/blogUtils';

const BlogRead = ({ blog, setPage }) => {
  const {
    title, content, likes, hates, owner, 
    last_modified, 
  } = blog;
  const [stage, setStage] = useState(0);
  const [title_time, setTitle_time] = useState(null);
  const [parsed_content, setParsed_content] = useState(null);

  useEffect(() => {
    if (title_time === null) {
      (async () => (
        estimateReadTimeForText(parseText(title))
      ))().then(setTitle_time);
    }
  }, [title_time, setTitle_time, title]);

  useEffect(() => {
    if (title_time !== null && parsed_content === null) {
      (async () => (
        parseText(content)
      ))().then(setParsed_content);
    }
  }, [parsed_content, setParsed_content, content, title_time]);

  const nextStage = function () {
    setStage(stage + 1);
  };

  const nextPage = function () {
    setPage('rate');
  };

  return (
    <div className='BlogRead'>
      <div className='centerAlign'>
        <FloatIn show={stage >= 0} onEnd={nextStage}>
          <h1>{title}</h1>
        </FloatIn>
        <FloatIn show={stage >= 1} onEnd={nextStage} wait={title_time * 2}>
          <span className='smallGray'>written by</span>{' '}
          <span>{owner}</span>{' '}
          {useMediaQuery({ query: '(max-device-width: 500px)' }) &&
            <br />
          }
          <span className='smallGray'>at</span>{' '}
          <span>{formatTime(last_modified)}</span>
        </FloatIn>
        <FloatIn show={stage >= 2} onEnd={nextStage}>
          <span className='likes mr-3'>
            {`Likes: ${likes.toLocaleString()}`}
          </span>
          <span className='hates'>
            {`Hates: ${hates.toLocaleString()}`}
          </span>
        </FloatIn>
      </div>
      {stage >= 3 &&
        <TypeWriter parsed={parsed_content} onEnd={nextStage} />
      }
      <FloatIn show={stage >= 4} onEnd={nextStage}>
        <div className='centerAlign'>
          <div
            className='button blueButton' tabIndex={0}
            onClick={nextPage} onKeyUp={enterMeansClick(nextPage)}
          >
            Finish
          </div>
        </div>
      </FloatIn>
    </div>
  );
};

export default BlogRead;
