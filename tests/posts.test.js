const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8088, () => {
    console.log("Testing on port 8080");
  });
const User = require('../models/user')
const Post = require('../models/post')
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
    mongoServer.stop();
    server.close;
  });
  
  afterAll((done) => done());

  describe("Test post endpoints", () => {
    test("It should create a  new post", async () => {
        // insert the code to authenticate a user here
        const user = new User({ username: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
        await user.save()
        const token = await user.generateAuthToken()

        //then send in the post as the post needs to be authenticated by a user login.
        const postResponse = await request(app)
        .post("/posts")
        .set('Authorization', `Bearer ${token}`)
        .send({
              title: "rando Title 111",
              body: "ALl of the words"
          });
          expect(postResponse.statusCode).toBe(200);
          expect(postResponse.body.post.title).toEqual('rando Title 111');
          expect(postResponse.body.post.body).toEqual('ALl of the words')
      })
  

    
    test('This should update a Post', async () => {
        const user = new Post({
            title: "Random title2",
            body: "words words words, longings longings longings lokgjgkgn"
        })

        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .put(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'mike doe', email: 'mike.doe@email.com'})
        
        
    })

    test('it should delete the user', async () => {
        const user = new User({
            username: 'nickD94',
            email: 'ndaly94@gmail.com',
            password: 'notpassword'
        })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .delete(`/posts/${post._id}`)
            .set('Authorization', `Bearer ${token}`)
        
        expect(response.statusCode).toBe(204)
    })
})

