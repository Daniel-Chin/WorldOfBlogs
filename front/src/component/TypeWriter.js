import React, { useState, useEffect } from 'react';

const INTRO_TIME = 4500;

const TypeWriter = ({ parsed, onEnd, access_time, title_time }) => {
  const [n_paragraph, setN_paragraph] = useState(1);
  const [n_line, setN_line] = useState(1);
  const [n_word, setN_word] = useState(1);
  const [finished, setFinished] = useState(false);
  const [time_passed, setTime_passed] = useState(0);

  useEffect(() => {
    if (finished || parsed === null) return;
    const word_time = parsed[n_paragraph - 1][n_line - 1][n_word - 1].time;
    let time = Date.now() - access_time - time_passed - title_time - INTRO_TIME;
    if (time > 0) {
      time = 1;
    } else {
      time = word_time;
    }
    const timeout = setTimeout(() => {
      setTime_passed((x) => (x + word_time));
      if (n_word === parsed[n_paragraph - 1][n_line - 1].length) {
        if (n_line === parsed[n_paragraph - 1].length) {
          if (n_paragraph === parsed.length) {
            setFinished(true);
            onEnd();
          } else {
            setN_word(1);
            setN_line(1);
            setN_paragraph(n_paragraph + 1);
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
    time_passed, setTime_passed, 
    access_time, title_time, 
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
            ).map((line, j) => (
              <span key={j}>
                {((
                  (i === n_paragraph - 1) && (j === n_line - 1)
                ) ?
                  line.slice(0, n_word)
                :
                  line
                ).map((word, k) => (
                  <span key={k}>
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
