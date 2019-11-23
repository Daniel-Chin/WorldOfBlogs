const MAX_READ_TIME = 2 * 60 * 1000;  // 2 minutes

const wordTime = (word) => (
  187.7 + 90 * word.length
);

const parseText = (text) => {
  return text.replace('\r', '').split('\n\n').map((paragraph) => (
    paragraph.split('\n').map((line) => (
      line.split(' ').map((word) => ({
        word, 
        time: wordTime(word), 
      }))
    ))
  ));
};

const estimateReadTimeForText = (parsed_text) => (
  parsed_text.reduce((acc, paragraph) => (
    acc + paragraph.reduce((acc, line) => (
      acc + line.reduce((acc, word) => (
        acc + word.time
      ), 0)
    ), 0)
  ), 0)
);

const estimateReadTime = ({ title, content }) => {
  // console.log(estimateReadTimeForText(parseText(content)));
  return estimateReadTimeForText(parseText(title))
    + 1
    + estimateReadTimeForText(parseText(content));
};

module.exports = {
  MAX_READ_TIME, 
  parseText, 
  estimateReadTime, 
  estimateReadTimeForText, 
};
