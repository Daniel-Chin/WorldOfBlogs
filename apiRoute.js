const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { authMidware, userRouter } = require('./user/index');
const { 
  USERS, BLOGS, DELETED, getDb, setDb, opinionTransact, 
  newBlogTransact, purgeBlog, 
} = require('./db');
const { MAX_READ_TIME, estimateReadTime } = require('./misc');

const REJECTION_MAX_TRY = 32;

const apiRouter = express.Router();
apiRouter.use(cookieParser());    // req.cookies
apiRouter.use(bodyParser.urlencoded({ extended: false }));
apiRouter.use(bodyParser.json());

apiRouter.use('/user', userRouter);

apiRouter.get('/view', authMidware, async (req, res) => {
  const history = req.user.history;
  const last_view = history[history.length - 1];
  if (last_view) {
    if (last_view.expire > Date.now()) {
      // Last view not expired yet
      res.json(false);
      return;
    }
  }
  const max_id = (await getDb('max_id', 'value')).value;
  let blog;
  let tries = 0;
  while (! blog) {
    if (tries ++ >= REJECTION_MAX_TRY) {
      res.json(false);
      return;
    }
    blog = await getDb(BLOGS, 
      Math.floor(Math.random() * (max_id + 1)).toString()
    );
  }
  res.json(blogAddOpinionDelId(blog, req.user));

  // update user.history
  await setDb(USERS, req.user.name, {
    ...req.user, 
    history: [
      ...history, 
      {
        blog: blog.id, 
        expire: Date.now() + blog.read_time, 
      }, 
    ], 
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
        const { title, owner, last_modified } = blog;
        return { title, owner, last_modified };
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
  if (estimateReadTime({ title, content }) > MAX_READ_TIME) {
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

const blogAddOpinionDelId = (blog, user) => (
  {
    ...blog, 
    id: null, 
    my_opinion: user.opinions[blog.id], 
  }
);

module.exports = apiRouter;
