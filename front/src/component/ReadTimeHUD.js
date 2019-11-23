import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import FloatIn from './FloatIn';
import { is_mobile } from '../helper/misc';
import { MAX_READ_TIME, estimateReadTime } from '../helper/blogUtils';

const WAIT_TIME = 1000;

const ReadTimeHUD = ({ title, content, setMenu_visible }) => {
  const LIMIT_IS = `Limit is ${formatReadTime(MAX_READ_TIME)}.`;

  const [stage, setStage] = useState(null);
  // wait, busy, {read_time}

  useEffect(() => {
    setStage('wait');
    const timeout = setTimeout(() => {
      setStage('busy');
    }, WAIT_TIME);
    return function () {
      clearTimeout(timeout);
    };
  }, [title, content]);

  useEffect(() => {
    if (stage === 'busy') {
      let is_subscribed = true;
      (async function () {
        return estimateReadTime({ title, content });
      })().then((read_time) => {
        if (is_subscribed) {
          setStage(read_time);
          if (read_time >= MAX_READ_TIME) {
            setMenu_visible(true);
          }
        }
      });
      return function () {
        is_subscribed = false;
      };
    }
  }, [
    title, content, stage, setMenu_visible, 
  ]);

  if (stage === null || stage === 'wait') {
    return (
      <>
      </>
    );
  }

  if (stage === 'busy') {
    return (
      <div className='ReadTimeHUD'>
        <FloatIn show>
        {
          is_mobile ? 'Computing...' : 'Estimating read time...'
        }
        </FloatIn>
      </div>
    );
  }

  const read_time = stage;
  const over_time = read_time >= MAX_READ_TIME;

  return (
    <div className='ReadTimeHUD'>
      <FloatIn show>
        <span data-tip data-for='readtime'>
          {formatReadTime(read_time)}
          {' '}
          <FontAwesomeIcon 
            className={'tiptool' + (over_time ? ' red' : '')} 
            icon={over_time ? 
              faExclamationTriangle : faQuestionCircle
            } 
          />
        </span>
        <ReactTooltip 
          effect='solid' multiline 
          className={'tooltip' + 
            (over_time ? ' tooltipRed' : '')
          } 
          id='readtime' place='left' offset={{
            bottom: '20px', 
          }} type={over_time ? 'error' : 'dark'}
        >
          Estimated read time. <br />
          {LIMIT_IS}
        </ReactTooltip>
      </FloatIn>
    </div>
  );
};

const formatReadTime = (read_time) => {
  const n_seconds = Math.ceil(read_time / 1000);
  return `${n_seconds} ${
    is_mobile ? 'sec' : (
      n_seconds === 1 ? 'second' : 'seconds'
    )
  }`;
};

export default ReadTimeHUD;
