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

const API = async (method, url, data, config, unAuth) => {
  try {
    return (await axios({
      method, 
      url: HOST[await which] + url,
      data, 
      ...config, 
      withCredentials: true, 
    })).data;
  } catch (e) {
    if (e.response) {
      if (e.response.status === 401) {
        if (unAuth !== 'do not unAuth') {
          console.warn('Attempted to access restricted API without valid credentials. This is a sign of bug. ');
          unAuth(true);
        }
      }
    }
  }
};

const GET = async (url, config, unAuth) => (
  await API('get', url, {}, config, unAuth)
);

const POST = async (url, data, unAuth) => (
  await API('post', url, data, {}, unAuth)
);

const login = async (credentials, setWhoami) => {
  const res = await GET('user/login', {
    params: credentials, 
  });
  if (res && res.is_ok) {
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
