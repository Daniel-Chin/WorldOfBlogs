// Please see readme.md for documentation  

const express = require('express');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const { USERS, getDb, setDb, registerTransact } = require('../db');
const { COOKIE, isPasswordValid, isUsernameValid } = require('./helper');
const authMidware = require('./midware');

const SALT_ROUNDS = 10;
const TEN_YEARS = 60 * 60 * 24 * 365 * 10 * 1000;

const userRouter = express.Router();

userRouter.get('/checkUsername', (req, res) => {
  getDb(USERS, req.query.username).then((user) => {
    if (user) {
      res.json(false);
    } else {
      res.json(true);
    }
  });
});

userRouter.get('/register', async (req, res) => {
  const { username, password } = req.query;
  const username_valid = isUsernameValid(username);
  if (! username_valid.is_ok) {
    res.json(username_valid);
    return;
  }
  const password_valid = isPasswordValid(password);
  if (! password_valid.is_ok) {
    res.json(password_valid);
    return;
  }
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await registerTransact({
    name: username, 
    hash, 
    quote: 'Say something...',
    mine: [], 
    history: [], 
    opinions: {},
  });
  if (result) {
    res.json({
      is_ok: true, 
    });
  } else {
    res.json({
      is_ok: false, 
      message: 'Username already taken. ', 
    });
  }
});

userRouter.get('/login', async (req, res) => {
  const { username, password } = req.query;
  const user = await getDb(USERS, username);
  if (! user) {
    res.json({
      is_ok: false, 
      message: `User "${username}" does not exist. `,
    });
    return;
  }
  if (await bcrypt.compare(password, user.hash)) {
    // password correct
    const token = uuidv4();
    await setDb(USERS, username, {  // Don't respond before token is stored
      ...user, 
      token: {
        value: token, 
        deadline: Date.now() + TEN_YEARS,
      },
    });
    res.cookie(COOKIE.USERNAME, username, {
      httpOnly: true, 
      maxAge: TEN_YEARS, 
    });
    res.cookie(COOKIE.TOKEN, token, {
      httpOnly: true, 
      maxAge: TEN_YEARS, 
    });
    res.json({
      is_ok: true, 
    });
  } else {
    res.json({
      is_ok: false, 
      message: `Wrong password. `,
    });
  }
});

userRouter.get('/whoami', authMidware, (req, res) => {
  res.send(req.cookies[COOKIE.USERNAME]);
});

userRouter.post('/edit', authMidware, async (req, res) => {
  const { quote } = req.body;
  const user = req.user;
  await setDb(USERS, user.name, {
    ...user, 
    quote, 
  });
  res.send('ok');
});

userRouter.get('/changePassword', authMidware, async (req, res) => {
  const { old_password, new_password } = req.query;
  const password_valid = isPasswordValid(new_password);
  if (! password_valid.is_ok) {
    res.json(password_valid);
    return;
  }
  const user = req.user;
  if (await bcrypt.compare(old_password, user.hash)) {
    const hash = await bcrypt.hash(new_password, SALT_ROUNDS);
    await setDb(USERS, user.name, {
      ...user, 
      hash, 
    });
    res.json({
      is_ok: true, 
    });
  } else {
    res.json({
      is_ok: false, 
      message: 'Old password incorrect. ', 
    });
  }
});

userRouter.get('/logout', authMidware, async (req, res) => {
  const user = req.user;
  await setDb(USERS, user.name, {
    ...user, 
    token: null, 
  });
  res.cookie(COOKIE.USERNAME, 0, { maxAge: 0 });
  res.cookie(COOKIE.TOKEN, 0, { maxAge: 0 });
  res.send('ok');
});

userRouter.get('/get', authMidware, async (req, res) => {
  const user = await getDb(USERS, req.query.username);
  if (user) {
    res.json({
      quote: user.quote, 
      n_blogs: user.mine.length, 
    });
  } else {
    res.json(false);
  }
});

module.exports = userRouter;
