const safeCompare = require('safe-compare');
const { USERS, getDb } = require('../db');
const { COOKIE } = require('./helper');

const authMidware = async (req, res, next) => {
  const { username, token } = req.cookies;
  if (username) {
    const user = await getDb(USERS, username);
    if (user && user.token) {
      if (user.token.deadline > Date.now()) {
        if (safeCompare(token, user.token.value)) {
          req.user = user;
          next();
          return;
        }
      }
    }
  }
  // clear cookies
  res.cookie(COOKIE.USERNAME, 0, { maxAge: 0 });
  res.cookie(COOKIE.TOKEN, 0, { maxAge: 0 });
  res.status(401).send('401 Unauthorized: User auth failed');
};

module.exports = authMidware;
