# World of Blogs
Final project for Dynamic Web App @ Tandon @ NYU by Daniel Chin.  

## Features
* The blogs cannot be accessed by their global ID. Users access blogs via their personal pointers to the blogs. This way, indexing the blogs becomes impossible.  
* Passwords are hashed and salted using [bcrypt](https://www.npmjs.com/package/bcrypt)  
* Registration race condition solved by [Firebase Transaction](https://firebase.google.com/docs/firestore/manage-data/transactions).  

## Data Structure
### User
```js
{
  name: 'unique str', 
  hash: 'hash and salt of password', 
  quote: 'I just love this sentence. ', 
  token: {
    value: '...', 
    deadline: 1573664371547, 
  }, 
  mine: [
    'blog id', 'blog id...', 
  ],  // 'deleted' if blog is deleted.  
  history: [
    {
      blog: 'blog id', 
      expire: 1573664371547, 
    } // 'deleted' if blog is deleted.  
  ],  // should have used Firestore subcollections...
  opinions: {
    [blog_id]: 'like' | 'hate' | 'none', 
  },
}
```

### Blog
```js
{
  id: '1628',   // incremental
  title: 'clickbait', 
  content: 'blah blah blah', 
  likes: 4, 
  hates: 69, 
  owner: 'username', 
  last_modified: 1573664371547, 
  read_time: 120, 
}
```

The id for blogs are incremental integers. This is for randomly sampling a blog to be O(1) and theta(1). The disadvantage is that one id may point to different blogs when the original is deleted, so we have to purge all the pointers to the deleted blog, so deletion of a blog becomes O(n^2).  
The database also remembers the max blog id, and a linked list of holes in the id chain. Adding a new blog fills the holes first.  

## API
All methods require user auth, except `user/register`, `user/checkUsername`, and `user/login`.  
If auth fails, HTTP 403 and clear cookie.  

### view
Gives a random blog that the user has not viewed.  
(Rejection sampling, max try = 32)  
Request: GET, cookie  
Response: `{ title, content, likes, hates, owner, last_modified, my_opinion }`  
If last view has not expired, response is `false`.  
If rejection sampling failed, response is `false`.  

### user/checkUsername
Request: GET, ? username  
Response: `true` or `false`  
True when the username is available.  

### user/register
Request: GET, ? username & password  
Response: 
```js
{
  is_ok: true | false, 
  message: 'Error message', 
}
```

### user/login
Request: GET, ? username & password  
Response: 
```js
{
  is_ok: true | false, 
  message: 'Error message', 
}
``` 
and set cookie.  

### user/whoami
This is for front end to know if user auth ok  
Request: GET, cookie  
Response: `username`  

### user/edit
Request: POST, cookie, body: `{ quote }`  
Response: 'ok'  

### user/changePassword
Request: GET, cookie, ? old_password & new_password  
(username is in cookie)  
Response: 
```js
{
  is_ok: true | false, 
  message: 'Error message', 
}
```

### user/logout
Request: GET, cookie  
Response: 'ok', and clear cookie.  

### rate
Request: GET, cookie, ? opinion=like|hate|none  
Response: 'ok'  

### listMine
Request: GET, cookie  
Response: 
```js
[
  { title, last_modified }, 
  ... // `false` if blog is deleted
]
```

### listHistory
Request: GET, cookie  
Response: 
```js
[
  { title, owner, last_modified }, 
  ... // `false` if blog is deleted
]
```

### user/get
Request: GET, cookie, ? username  
Response: `{ quote, n_blogs }`  
If user does not exist, response is `false`.  

### getMine
Request: GET, cookie, ? mine_index  
Response: `{ title, content, likes, hates, owner, last_modified }`  

### getHistory
Request: GET, cookie, ? history_index  
Response: `{ title, content, likes, hates, owner, last_modified, my_opinion }`  

### addBlog
Request: GET, cookie  
Response: `mine_index`  

### editBlog
Request: POST, cookie, body: `{ title, content, mine_index }`  
Response: `{ is_ok, message }`  

### delBlog
Also deletes all pointers to the blog.  
Request: GET, cookie, ? mine_index  
Response: 'ok'  

## Front End
### /
  rationale. "start viewing blogs" button
### /register
  already have an account? log in
### /login
  if you are logged in, "But you are already logged in." Log out button
### /logout
  log out button. to '/'
### /view
  if not logged: it is very important that you register.
  this many ppl liked. hated.
  rate
  next | dashboard | post a blog
### /dashboard
  change pw
  my blogs
  history
  link to /user/{me}
### /user/:username
  quote
  Shows how many blogs, but no link
### /history/:index
### /mine/:index
### /edit/:mine_index
### /new
### /invalid-cookie
  'Your sign in has expired. '  
https://www.npmjs.com/package/react-tooltip  
