const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { authMidware, userRouter } = require('./user/index');

const apiRouter = express.Router();
apiRouter.use(cookieParser());    // req.cookies
apiRouter.use(bodyParser.urlencoded({ extended: false }));
apiRouter.use(bodyParser.json());

apiRouter.use('/user', userRouter);

module.exports = apiRouter;
