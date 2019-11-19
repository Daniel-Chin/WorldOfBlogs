const MAX_READ_TIME = 0;

const wordTime = (word) => (
  187.7 + 90 * word.length
);

const parseText = (text) => {
  return text.split(' ').map((word) => ({
    word, 
    time: wordTime(word), 
  }));
};

const parseBlog = ({ title, content }) => {
  return {
    title: parseText(title), 
    content: parseText(content), 
  }
};

const estimateReadTime = (blog) => {
  const parsed = blog.parsed || parseBlog(blog);
  return parsed.title.reduce((acc, { time }) => (acc + time))
    + 1
    + parsed.content.reduce((acc, { time }) => (acc + time));
};

module.exports = {
  MAX_READ_TIME, 
  parseBlog, 
  estimateReadTime, 
};
