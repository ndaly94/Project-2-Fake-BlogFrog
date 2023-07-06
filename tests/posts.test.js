const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const server = app.listen(8080, () => { 
    console.log("Testing on port 8080") });
const Post = require('../models/post');
const User = require('../models/user');
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  mongoServer.stop();
  server.close();
});

describe('Test all post endpoints', () => {
    test('It should create a new post', async () => {
      const user = new User({
        username: 'wow immaTest',
        email: 'wow@email.com',
        password: '123987'
      });
      await user.save();
      const token = await user.generateAuthToken();
      const response = await request(app)
        .post('/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'New Post',
          body: 'this that post',
        });
  
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toEqual('New Post');
      expect(response.body.body).toEqual('this that post');
    });
  
    test('should show a specific post', async () => {
      const user = new User({
        username: 'izza test',
        email: 'show@email.com',
        password: '123987'
      });
      await user.save();
      const token = await user.generateAuthToken();
      const newPost = new Post({
        title: 'New Post',
        body: 'this that post',
      });
      await newPost.save();
      const response = await request(app)
        .get(`/posts/${newPost.id}`)
        .set('Authorization', `Bearer ${token}`);
  
      expect(response.body.title).toEqual('New Post');
      expect(response.body.body).toEqual('this that post');
    });
  
    test('it should update a post', async () => {
      const user = new User({
        username: 'to be or not to be, i dont know',
        email: 'update@email.com',
        password: '123987',
      });
      await user.save();
      const token = await user.generateAuthToken();
      const post = new Post({
        title: 'New Post',
        body: 'this that post'
      });
      await post.save();
  
      const response = await request(app)
        .put(`/posts/${post.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'new title new new',
          body: 'we putting words on the internet and other people read them cuz life is meaningless',
        });
  
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toEqual('new title new new');
      expect(response.body.body).toEqual('we putting words on the internet and other people read them cuz life is meaningless')
    });
  
    test('it should delete a post', async () => {
      const user = new User({
        username: 'i live only to die',
        email: 'delete@email.com',
        password: '123987',
      });
      await user.save();
      const token = await user.generateAuthToken();
      const post = new Post({
        title: 'New Post',
        body: 'this that post'
      });
      await post.save();
      const response = await request(app)
        .delete(`/posts/${post.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(204);
    });
})