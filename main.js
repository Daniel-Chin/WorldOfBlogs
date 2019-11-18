const express = require('express');

const apiRouter = require('./apiRoute');

const PORT = process.env.PORT || 4000;

const app = express();
if (process.env.PROD) {
  console.log('Production Environment!');
} else {
  console.log('Dev Environment! Using CORS!');
  const cors = require('cors');
  app.use(cors());
}

app.use('/api', apiRouter);
app.use('/ui', express.static('./front/build/'));

app.get('/', (_, res) => {
  res.redirect('/ui');
});

app.listen(PORT, function () {
  console.log(`Listening @ port ${PORT}`);
});
