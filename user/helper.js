const COOKIE = {
  USERNAME: 'username', 
  TOKEN: 'token', 
};

const ALL_LOWER = 'qwertyuiopasdfghjklzxcvbnm';
const ALL_LETTERS = ALL_LOWER + ALL_LOWER.toUpperCase();
const isPasswordValid = (password) => {
  // People use regex. I don't know regex...
  const all_legal = ALL_LETTERS + 
    '`1234567890-=[]\\;\',./~!@#$%^&*()_+{}|:"<>?';
  let error_message = null;

  if (password.length < 6) {
    error_message = 'Password must be at least 6 characters long. ';
  }
  if (password.length >= 72) {
    error_message = 'Password cannot be longer than 71 characters, as bcrypt algorithm requires. '
      + `Current password length is ${password.length}. `;
  }
  for (let char of password) {
    if (! all_legal.includes(char)) {
      error_message = `Password cannot include "${char}"`;
      break;
    }
  }
  return {
    is_ok: error_message === null, 
    message: error_message, 
  };
};

const isUsernameValid = (username) => {
  // People use regex. I don't know regex...
  const all_legal = ALL_LETTERS + '1234567890_- .';
  let error_message = null;

  if (! ALL_LETTERS.includes(username[0])) {
    error_message = `Username must start with a letter, not "${username[0]}". `;
  }
  if (username.length < 4) {
    error_message = 'Username must be at least 4 characters long. ';
  }
  if (username.length >= 32) {
    error_message = 'Username cannot be longer than 31 characters. ' +
      `Your username is ${username.length} characters long. `;
  }
  for (let char of username) {
    if (! all_legal.includes(char)) {
      error_message = `Username cannot include "${char}". Allowed: letters, numbers, underscore(_), hyphen(-), whitespace( ), period(.)`;
      break;
    }
  }
  if (username === 'admin') {
    error_message = 'Do not try to pretend to be the admin. ';
  }
  return {
    is_ok: error_message === null, 
    message: error_message, 
  };
};

module.exports = {
  isPasswordValid, 
  isUsernameValid, 
  COOKIE, 
};
