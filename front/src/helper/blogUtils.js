const MAX_READ_TIME = 2 * 60 * 1000;  // 2 minutes

const wordTime = (word) => (
  (word.length**1.3 - 4.7**1.3) * 35 + 170
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
