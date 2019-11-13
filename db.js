// provides an interface to Firestore

const admin = require('firebase-admin');

const USERS = 'users';
const BLOGS = 'blogs';

let serviceAccount;
if (process.env.SERVICE) {
  // On heroku, it's more secure to store private key as ENV
  serviceAccount = JSON.parse(process.env.SERVICE);
} else {
  // On local, we will just use file. 
  serviceAccount = require('./secret');
}

console.log('initializeApp...');
const fb = admin.initializeApp({
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

module.exports = {
  USERS, BLOGS, 
  getDb, 
  setDb, 
  getAllBlogs,
};
