const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { authMidware, userRouter } = require('./user/index');
const { 
  USERS, BLOGS, DELETED, getDb, setDb, opinionTransact, 
  newBlogTransact, purgeBlog, 
} = require('./db');
const { MAX_READ_TIME, estimateReadTime } = require('./front/src/helper/blogUtils');

const REJECTION_MAX_TRY = 32;

const apiRouter = express.Router();
apiRouter.use(cookieParser());    // req.cookies
apiRouter.use(bodyParser.urlencoded({ extended: false }));
apiRouter.use(bodyParser.json());

if (! process.env.PROD) {
  apiRouter.use((req, _, next) => {
    const { method, url, query, params, cookies, body } = req;
    console.log({ method, url, query, params, cookies, body });
    next();
  });
}

apiRouter.use('/user', userRouter);

apiRouter.get('/view', authMidware, async (req, res) => {
  const history = req.user.history;
  const last_view = history[history.length - 1];
  const history_blogs = history.map((x) => (x.blog));
  let blog;
  let access_time;
  if (
    last_view && last_view.blog !== DELETED && (
      last_view.expire > Date.now()
      ||
      req.user.opinions[last_view.blog] === undefined
    )
  ) {
    // Last view not expired yet || did not rate yet
    blog = await getDb(BLOGS, last_view.blog);
    access_time = last_view.access_time;
  } else {
    const max_id = (await getDb('max_id', 'value')).value;
    let tries = 0;
    let blog_id;
    while (! blog) {
      if (tries ++ >= REJECTION_MAX_TRY) {
        res.json(false);
        return;
      }
      blog_id = Math.floor(Math.random() * (max_id + 1)).toString();
      if (
        (tries < REJECTION_MAX_TRY / 2) 
      && 
        history_blogs.includes(blog_id)
      ) {
        continue;
      }
      blog = await getDb(BLOGS, blog_id);
    }
    access_time = Date.now();
    // update user.history
    setDb(USERS, req.user.name, {
      ...req.user, 
      history: [
        ...history, 
        {
          blog: blog.id, 
          access_time, 
          expire: access_time + blog.read_time, 
        }, 
      ], 
    });
  }
  res.json({
    ...blogAddOpinionDelId(blog, req.user), 
    access_time, 
  });
});

apiRouter.get('/rate', authMidware, (req, res) => {
  const opinion = req.query.opinion;
  if (! ['like', 'hate', 'none'].includes(opinion)) {
    res.end();  // Being rude to hackers is ok
    return;
  }
  const history = req.user.history;
  const blog_id_to_rate = history[history.length - 1].blog; // may throw TypeError, ok
  if (req.user.opinions[blog_id_to_rate]) {
    res.status(405).send(
      '405 METHOD NOT ALLOWED: Rating a blog more than once'
    );
    return;
  }
  const promise_0 = setDb(USERS, req.user.name, {
    ...req.user, 
    opinions: {
      ...req.user.opinions, 
      [blog_id_to_rate]: opinion, 
    }, 
  });
  const promise_1 = opinionTransact(blog_id_to_rate, opinion);
  Promise.all([promise_0, promise_1]).then(() => {
    res.send('ok');
  });
});

apiRouter.get('/listMine', authMidware, (req, res) => {
  Promise.all(req.user.mine.map(
    (blog_id) => {
      if (blog_id === DELETED) {
        return DELETED;
      }
      return getDb(BLOGS, blog_id);
    }
  )).then((blogs) => {
    res.json(blogs.map(
      (blog) => {
        if (blog === DELETED) {
          return false;
        }
        const { title, last_modified } = blog;
        return { title, last_modified };
      }
    ));
  });
});

apiRouter.get('/listHistory', authMidware, (req, res) => {
  Promise.all(req.user.history.map(
    ({ blog }) => {
      if (blog === DELETED) {
        return DELETED; 
      }
      return getDb(BLOGS, blog);
    }
  )).then((blogs) => {
    res.json(blogs.map(
      (blog) => {
        if (blog === DELETED) {
          return false;
        }
        const { title, owner } = blog;
        return { title, owner };
      }
    ));
  });
});

apiRouter.get('/getMine', authMidware, async (req, res) => {
  const blog_id = req.user.mine[req.query.mine_index];
  const blog = await getDb(BLOGS, blog_id);
  res.json(blogAddOpinionDelId(blog, req.user));
});

apiRouter.get('/getHistory', authMidware, async (req, res) => {
  const blog_id = req.user.history[req.query.history_index].blog;
  const blog = await getDb(BLOGS, blog_id);
  res.json(blogAddOpinionDelId(blog, req.user));
});

apiRouter.get('/addBlog', authMidware, async (req, res) => {
  const blog_id = await newBlogTransact(req.user);
  const mine = req.user.mine;
  await setDb(USERS, req.user.name, {
    ...req.user, 
    mine: [...mine, blog_id], 
  });
  res.json(mine.length);
});

apiRouter.post('/editBlog', authMidware, async (req, res) => {
  const { title, content, mine_index } = req.body;
  const read_time = estimateReadTime({ title, content });
  if (read_time > MAX_READ_TIME) {
    res.json({
      is_ok: false, 
      message: 'Blog too long. ', 
    });
    return;
  }
  const blog_id = req.user.mine[mine_index];
  const blog = await getDb(BLOGS, blog_id);
  if (! blog) {
    res.json({
      is_ok: false, 
      message: 'Blog does not exist. ', 
    });
    return;
  }
  await setDb(BLOGS, blog_id, {
    ...blog, 
    title, 
    content, 
    read_time, 
    last_modified: Date.now(), 
  });
  res.json({
    is_ok: true, 
  });
});

apiRouter.get('/delBlog', authMidware, async (req, res) => {
  const blog_id = req.user.mine[req.query.mine_index];
  if (blog_id === DELETED) {
    res.end();
    return;
  }
  await purgeBlog(blog_id);
  res.send('ok');
});

apiRouter.get('/about', (_, res) => {
  res.send('World of Blogs');
});

const blogAddOpinionDelId = (blog, user) => (
  {
    ...blog, 
    id: null, 
    my_opinion: user.opinions[blog.id], 
  }
);

module.exports = apiRouter;
