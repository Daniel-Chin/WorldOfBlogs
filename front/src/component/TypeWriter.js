import React, { useState, useEffect } from 'react';

const TypeWriter = ({ parsed, onEnd, access_time }) => {
  const [n_paragraph, setN_paragraph] = useState(1);
  const [n_line, setN_line] = useState(1);
  const [n_word, setN_word] = useState(1);
  const [finished, setFinished] = useState(false);
  const [fast_forward, setFast_forward] = useState(Date.now() - access_time);

  useEffect(() => {
    if (finished) return;
    let { time } = parsed[n_paragraph - 1][n_line - 1][n_word - 1];
    if (fast_forward > 0) {
      setFast_forward(fast_forward - time + 1);
      time = 1;
    }
    const timeout = setTimeout(() => {
      if (n_word === parsed[n_paragraph - 1][n_line - 1].length) {
        if (n_line === parsed[n_paragraph - 1].length) {
          if (n_paragraph === parsed.length) {
            setFinished(true);
            onEnd();
          } else {
            setN_paragraph(n_paragraph + 1);
            setN_line(1);
            setN_word(1);
          }
        } else {
          setN_word(1);
          setN_line(n_line + 1);
        }
      } else {
        setN_word(n_word + 1);
      }
    }, time);
    return () => {clearTimeout(timeout);};
  }, [
    n_paragraph, n_line, n_word, 
    setN_paragraph, setN_line, setN_word, 
    onEnd, parsed, finished, setFinished,
    fast_forward, setFast_forward, 
  ]);

  if (parsed === null) {
    return (
      <div className='error centerAlign mt-5'>
        Wait... This blog is surprisingly difficult to display... 
      </div>
    );
  }

  return (
    <div>
      {
        parsed.slice(0, n_paragraph).map((paragraph, i) => (
          <p key={i}>
            {(i === n_paragraph - 1 ?
              paragraph.slice(0, n_line)
            :
              paragraph
            ).map((line, i) => (
              <span key={i}>
                {(i === n_line - 1 ?
                  line.slice(0, n_word)
                :
                  line
                ).map((word, i) => (
                  <span key={i}>
                    {word.word}{' '}
                  </span>
                ))}
                <br />
              </span>
            ))}
          </p>
        ))
      }
    </div>
  );
};

export default TypeWriter;
