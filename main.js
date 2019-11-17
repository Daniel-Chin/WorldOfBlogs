const express = require('express');

const apiRouter = require('./apiRoute');

const PORT = process.env.PORT || 4000;

const app = express();

app.use('/api', apiRouter);

app.listen(PORT, function () {
  console.log(`Listening @ port ${PORT}`);
});
