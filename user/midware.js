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
  res.cookie(COOKIE.USERNAME, 0, { maxAge: Date.now() });
  res.cookie(COOKIE.TOKEN, 0, { maxAge: Date.now() });
  res.status(403).send('403 Forbidden: User auth failed');
};

module.exports = authMidware;
