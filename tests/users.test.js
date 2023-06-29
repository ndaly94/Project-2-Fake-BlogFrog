const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => {
    console.log("Testing on port 8080");
  });
const User = require('../models/user')
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

  describe("Test user endpoints", () => {
    test("It should create a  new user", async () => {
      const response = await request(app)
      .post("/users")
      .send({
            username: "JohnDoe25",
            email: "john.doe@email.com",
            password: "johndoepassword123"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.user.username).toEqual('JohnDoe25');
        expect(response.body.user.email).toEqual('john.doe@email.com');
    })

    test('A User is Logged In', async () => {
        const user = new User({
            username: "JaneDoe25",
            email: "jane.doe@email.com",
            password: 'janedoepassword',
        })
        await user.save()

        const response = await request(app)
        .post('/users/login')
        .send({ email: 'jane.doe@email.com', password: 'janedoepassword' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.user.username).toEqual('JaneDoe25')
    expect(response.body.user.email).toEqual('jane.doe@email.com')
    expect(response.body).toHaveProperty('token')
    })

    test('It should update a user', async () => {
        const user = new User({ username: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
          .put(`/users/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ username: 'Jane Doe', email: 'jane.doe@example.com' })
        expect(response.statusCode).toBe(200)
        expect(response.body.username).toEqual('Jane Doe')
        expect(response.body.email).toEqual('jane.doe@example.com')
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
            .delete(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
        
        expect(response.statusCode).toBe(204)
    })
})
