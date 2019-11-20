import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import FloatIn from './FloatIn';
import TypeWriter from './TypeWriter';
import { formatTime, enterMeansClick } from '../helper/misc';
import { parseText, estimateReadTimeForText } from '../helper/blogUtils';

const SKIP_ANIM_THRESHOLD = 5000; 
// If the user returned to this page and see the same blog, 
// Skip the opening animation

const BlogRead = ({ blog, setPage }) => {
  const {
    title, content, likes, hates, owner, 
    last_modified, access_time, 
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

  useEffect(() => {
    if (stage < 3 && access_time < Date.now() - SKIP_ANIM_THRESHOLD) {
      setStage(3);
    }
  }, [stage, access_time, setStage]);

  const updateStage = function () {
    setStage(Math.max(stage, this));
  }
  const nextPage = function () {
    setPage('rate');
  };

  return (
    <div className='BlogRead'>
      <div className='centerAlign'>
        <FloatIn show={stage >= 0} onEnd={updateStage.bind(1)}>
          <h1>{title}</h1>
        </FloatIn>
        <FloatIn 
          show={stage >= 1} onEnd={updateStage.bind(2)} 
          wait={title_time * 2}
        >
          <span className='smallGray'>written by</span>{' '}
          <Link to={'/user/' + owner}>{owner}</Link>{' '}
          {useMediaQuery({ query: '(max-device-width: 500px)' }) &&
            <br />
          }
          <span className='smallGray'>at</span>{' '}
          <span>{formatTime(last_modified)}</span>
        </FloatIn>
        <FloatIn show={stage >= 2} onEnd={updateStage.bind(3)}>
          <span className='likes mr-3'>
            {`Likes: ${likes.toLocaleString()}`}
          </span>
          <span className='hates'>
            {`Hates: ${hates.toLocaleString()}`}
          </span>
        </FloatIn>
      </div>
      <FloatIn show={stage >= 3}>
        <TypeWriter 
          parsed={parsed_content} onEnd={updateStage.bind(4)} 
          access_time={access_time}
        />
      </FloatIn>
      <FloatIn show={stage >= 4}>
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
