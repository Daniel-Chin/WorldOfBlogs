import axios from 'axios';

const HOST = {
  prod: '/api/', 
  dev: 'http://localhost:4000/api/', 
};
let which = new Promise((resolve, _) => {
  ['prod', 'dev'].forEach((x) => {
    axios.get(HOST[x] + 'about')
      .then((res) => {
        if (res.data === 'World of Blogs') {
          console.log('API host is', HOST[x]);
          resolve(x);
        }
      })
      .catch((_) => {});
  });
});
// const which = 'prod';

const API = async (verb, url, more, unAuth) => {
  try {
    return (await verb(HOST[await which] + url, more)).data;
  } catch (e) {
    if (e.response) {
      if (e.response.status === 401) {
        unAuth(true);
      }
    }
  }
};

const GET = async (url, options, unAuth) => (
  await API(axios.get, url, options, unAuth)
);

const POST = async (url, body, unAuth) => (
  await API(axios.post, url, body, unAuth)
);

const login = async (credentials, setWhoami) => {
  const res = await GET('user/login', {
    params: credentials, 
  });
  if (res.is_ok) {
    setWhoami(credentials.username);
    return true;
  } else {
    return res;
  }
};

export {
  GET, 
  POST, 
  login, 
};
