import React, { useState, useEffect } from 'react';

const WAIT_END = 1000;
const TRANSITION = .4;
const TRANSLATION = '20px'
const HIDE_STYLE = {
  opacity: 0, 
  transform: `translate(0, ${TRANSLATION})`, 
  transition: `${TRANSITION}s`, 
};

const FloatIn = ({ show, onEnd, wait, children }) => {
  const wait_start = wait || 0;
  const [stage, setStage] = useState('waiting');
  const [style, setStyle] = useState(HIDE_STYLE);

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

  useEffect(() => {
    if (stage !== 'waiting' && ! show) {
      setStage('waiting');
      setStyle(HIDE_STYLE);
  }
  }, [stage, setStage, show, setStyle]);

  return (
    <div style={style}>
      {stage !== 'waiting' &&
        children
      }
    </div>
  );
};

export default FloatIn;
