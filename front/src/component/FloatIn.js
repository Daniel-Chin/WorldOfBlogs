import React, { useState, useEffect } from 'react';

const WAIT_END = 1000;
const TRANSITION = .4;
const TRANSLATION = '20px'

const FloatIn = ({ show, onEnd, wait, children }) => {
  const wait_start = wait || 0;
  const [stage, setStage] = useState('waiting');
  const [style, setStyle] = useState({
    opacity: 0, 
    transform: `translate(0, ${TRANSLATION})`, 
    transition: `${TRANSITION}s`, 
  });

  useEffect(() => {
    if (wait === null) return;
    if (stage === 'waiting' && show) {
      const timeout = setTimeout(() => {
        setStage('animating');
        setStyle({
          ...style, 
          opacity: 1, 
          transform: 'none', 
        });
      }, wait_start);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [wait, stage, show, style, setStyle, setStage, wait_start]);

  useEffect(() => {
    if (stage === 'animating') {
      const timeout = setTimeout(() => {
        setStage('ended');
        onEnd && onEnd();
      }, TRANSITION * 1000 + WAIT_END);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [stage, setStage, onEnd]);

  return (
    <div style={style}>
      {stage !== 'waiting' &&
        children
      }
    </div>
  );
};

export default FloatIn;
