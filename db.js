// provides an interface to Firestore

const admin = require('firebase-admin');

const USERS = 'users';
const BLOGS = 'blogs';
const HOLES = 'holes';
const DELETED = 'deleted';

let serviceAccount;
if (process.env.SERVICE) {
  // On heroku, it's more secure to store private key as ENV
  serviceAccount = JSON.parse(process.env.SERVICE);
} else {
  // On local, we will just use file. 
  serviceAccount = require('./secret');
}

console.log('initializeApp...');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dyn-web-final-8p3.firebaseio.com", 
});
console.log('initializeFirestore...');
const db = admin.firestore();

const setDb = async (which_db, id, content) => {
  const docRef = db.collection(which_db).doc(id);
  return await docRef.set(content);
};

const getDb = async (which_db, id) => {
  const docRef = db.collection(which_db).doc(id);
  return (await docRef.get()).data();
};

const getAllBlogs = async function () {
  const snapshot = await db.collection(BLOGS).get();
  const blogs = [];
  snapshot.forEach((doc) => {
    blogs.push({
      id: doc.id, 
      data: doc.data(), 
    });
  });
  return blogs;
};

const registerTransact = async (new_user) => {
  const userRef = db.collection(USERS).doc(new_user.name);
  return await db.runTransaction(async (t) => {
    const user = (await t.get(userRef)).data();
    if (user) { // username collision
      return Promise.resolve(false);
    }
    t.set(userRef, new_user);
    return Promise.resolve(true);
  });
};

const opinionTransact = async (blog_id, opinion) => {
  const blogRef = db.collection(BLOGS).doc(blog_id);
  return await db.runTransaction(async (t) => {
    const blog = (await t.get(blogRef)).data();
    if (opinion === 'like') {
      blog.likes ++;
    } else if (opinion === 'hate') {
      blog.hates ++;
    }
    t.set(blogRef, blog);
    return Promise.resolve(true);
  });
};

const newBlogTransact = async (user) => {
  const maxIdRef = db.collection('max_id').doc('value');
  const holes = db.collection(HOLES);
  return await db.runTransaction(async (t) => {
    const to_wait = []; // promises to wait for at the end
    let new_id;
    const first_hole = (await t.get(holes.doc('head'))).data().next;
    if (first_hole !== -1) {
      // fill hole
      new_id = first_hole;
      const second_hole = (await t.get(
        holes.doc(first_hole.toString())
      )).data().next;
      to_wait.push(t.delete(
        holes.doc(first_hole.toString())
      ));
      to_wait.push(t.set(holes.doc('head'), { next: second_hole }));
    } else {
      // append
      new_id = (await t.get(maxIdRef)).data().value + 1;
      to_wait.push(t.set(maxIdRef, { value: new_id }));
    }
    new_id = new_id.toString();
    t.set(db.collection(BLOGS).doc(new_id), {
      id: new_id, 
      title: 'dafault', 
      content: 'default', 
      likes: 0, hates: 0, 
      owner: user.name, 
      last_modified: Date.now(), 
      read_time: 0, 
    });
    await Promise.all(to_wait);
    return Promise.resolve(new_id);
  });
};

const purgeBlog = async (blog_id) => {
  const usersRef = db.collection(USERS);
  const holesRef = db.collection(HOLES);
  return await db.runTransaction(async (t) => {
    const [hole, snapshot] = await Promise.all([
      t.get(holesRef.doc('head')), 
      t.get(usersRef), 
    ]);
    const first_hole = hole.data().next;
    t.set(holesRef.doc('head'), { next: blog_id });
    t.set(holesRef.doc(blog_id), { next: first_hole });
    snapshot.forEach((doc) => {
      const user = doc.data();
      let modified = false;
      user.mine = user.mine.map((x) => {
        if (x === blog_id) {
          modified = true;
          return DELETED;
        }
        return x;
      });
      user.history = user.history.map((x) => {
        if (x.blog === blog_id) {
          modified = true;
          return {
            ...x, 
            blog: DELETED, 
          };
        }
        return x;
      });
      if (user.opinions[blog_id]) {
        modified = true;
        delete user.opinions[blog_id];
      }
      if (modified) {
        t.set(USERS.doc(doc.id), user);
      }
    });
    t.delete(db.collection(BLOGS).doc(blog_id));
    return Promise.resolve(true);
  });
};

module.exports = {
  USERS, BLOGS, 
  getDb, 
  setDb, 
  getAllBlogs,
  registerTransact,
  opinionTransact, 
  newBlogTransact, 
  purgeBlog, 
};
