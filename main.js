const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { authMidware, userRouter } = require('./user/index');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cookieParser());    // req.cookies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRouter);

app.listen(PORT, function () {
  console.log(`Listening @ port ${PORT}`);
});
