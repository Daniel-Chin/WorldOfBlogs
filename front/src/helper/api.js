import axios from 'axios';

const HOST = {
  prod: '/api/', 
  dev: 'http://localhost:4000/api/', 
};
let which = new Promise((resolve, _) => {
  ['prod', 'dev'].forEach((x) => {
    axios.get(HOST[x] + 'about')
      .then((res) => {
        if (res.data() === 'World of Blogs') {
          resolve(x);
        }
      })
      .catch(() => {});
  });
});
// const which = 'prod';

const GET = async (url, options) => (
  (await axios.get(HOST[await which] + url, options)).data()
);

const POST = async (url, body) => (
  (await axios.post(HOST[await which] + url, body)).data()
);

export {
  GET, 
  POST, 
};
