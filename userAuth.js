const bcrypt = require('bcrypt');
const { USERS, getDb, setDb, registerTransact } = require('./db');

const SALT_ROUNDS = 10;
const COOKIE = {
  USERNAME: 'username', 
  TOKEN: 'token', 
};

const auth = (req, res, next) => {
  req.whois = null;
  const { username, token } = req.cookies;
  getDb(USERS, username).then((user) => {
    if (user.token) {
      if (user.token.deadline > Date.now()) {
        if (user.token.value === token) { // timing attack! 
          req.whois = username;
          next();
        }
      }
    }
    // clear cookies
    res.cookies(COOKIE.USERNAME, 0, { maxAge: Date.now() });
    res.cookies(COOKIE.TOKEN, 0, { maxAge: Date.now() });
    res.status(403).send('User auth failed');
  });
};

module.exports = {
  auth, 
};
