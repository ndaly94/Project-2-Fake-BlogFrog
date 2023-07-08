# Pre-Requisites 

#### Node.js and nodemon are required to be installed in thei sfile or gloally on the machine that is running it.
# Installation Instructions:
## 1. Create an empty repo on your local machine and cd into it
## 2. Go to https://github.com/ndaly94/Project-2-Fake-BlogFrog and go to the "code" dropdown menu. Select SSH and copy and paste
## 3. In the empty directory type in "git clone paste SSH here" and hit enter
## 4. Open the repo in VS Code by typing code . in the command line
## 5. Install the primary dependencies with the command "npm i" after cd-ing into the directory
## 6. Touch a .env which has your mongoURI info and Secret, do not share this with anyone



# Diagram and Wireframe

![Alt text](User-Posts-Diagram.jpeg)

![Alt text](<New Note.jpeg>)

# Dependencies needed to run:

#### Express, Node, dotenv, MogoDB, Mongoose, bcrypt, jwt, morgan, MongoDB-Memory-Server, Jest, Supertest
#### To run in dev mode nodemon must be installed globally. To run "DEV" type 'npm run dev' in the terminal.
#### To start the app run 'npm start'


#### https://trello.com/b/6nMpdnLV/blogfrog-project


## Route Breakdown
### User
### createUser
### route on '/users' that allows the backend to create a new User. Uses the POST method. The new User must be made based on the user Schema that is defined in the models folder. When creating a user we do not generate an auth token, the auth token is generated when we login to the user. 
### indexUsers
#### route on '/users' that renders all users stored in the database via JSON. This is done via the GET method
### getUserById
#### route on '/users/:id' that renders a specific user from the database. This is done with the GET method. This route also requires proper authorization for the user's data to be accessed. 
### loginUser
#### route on '/users/login' which logins a specific user based on their email and password. Upon a succesful login a new authorization token is generated and grants access to all of that users data and the corresponding methods which require authorization. The loginUser route uses the POST method.
### updateUser
#### route on '/users/:id' which allows us to change the info of a previously existing user. This requires the user to be authenticated in order to make these changes and the changes much fit the same User Schema which it was initially created in. The updateUser message uses the PUT method. 
### deleteUser
#### route on '/users/:id' which allows us to delete a specific user. User Authentification is required to complete the deletion process. The deleteUser message uses the DELETE method. 


## Model Breakdown
### User
#### The User Model is created based on a Mongoose Schema. A username, an email, and a password are required for the creation of a new user. Users are also linked to the posts they created on the blog, however they are not a required field. Each user must have a unique username and email address and the creation of the user is timestamped. 
#### The User also has its own unique Bearer auth token which is crewated via the generateAuthToken method and leverages the json-web-token dependency. 

### Post
#### The Post Model is simpler than the User model in that it only requires two Key:Value pairs to be created, the title and the body. The Posts are also inherintly tied to a User meaining that a User must be signed in to create a post and that post will be tied to that user in the database. 

## Test Routes

### User
#### This code has comprehinzive user testing, corresponding one-one with the routes. Automated tests via jest test the authentification of a user, the creation of a user, the logging-in of a user, the updating of a users info, and the deletion of a user. 

### Posts
#### We also test the creation of a post automattically via Jest. This test involves the creation and loggining in of a dummy user in order to authenticate itself prior to the creation of the post. Additonally there is testing for showing one post, updating a post, and deleting a post. All of these tests require proper user authentification as posts are directly tied to users in this model. 

### Load Testing w/Artillery

#### Via the artillery.yml file we are able to add load testing to this program, specifically the user. In the artillery file we are specifically testing the new user route by sending a randomized new user 60 times in rapid succesion. The strings sent over for the username and email are randomized with an assist from Javascript as it is required that they are unique in the schema.

## Challenges
#### When creating this API I ran into issues regarding my package.json which led to a few hours of troubleshooting before haiving to reach out for help from my instructional team. I had installed unnecassary dependencies which in turn threw errors when attempting to run basic routes.

#### Additionally, after completing that portion of the troubleshooting I individually tested each route using Postman. In that testing process I found that my blog post's routes were not working as intended. Upon checking my Router function I had entered a redundent '/posts' on the routes in the posts.js routes file. They were redundent because I had already indicated in my app.js at the postRoutes would correspond to '/posts' in my app.use file. This made it so that to create a new blog-post or index them I had to go to '/posts/posts' a redundent url line. Once this fix was made the code began working as intended and I learned to always double check your url routing, a lesson Im sure I should have already learned. 

#### While attempting to create testing routes for my app I ran into compatability issues regarding jest and Node.js. Looking into my package.json I found that when initially installing jest it had installed on version 25 which was an outdated version. After following this link: https://mongoosejs.com/docs/jest.html#recommended-testenvironment. I found that jest before version 26 were made to be used in JSDom and to use Node you either have to upgrade or change the testing enviornment. I unfortunately could not find where in the node_modules/ the testing enviorment change was so I opted to update the jest version. npm update jest refused to work so I opted to uninstall jest and reinstall forcing it to install the current version, 29.5.0. I did this with the following command npm i jest@29

#### While creating the artillery testing I also encountered an issue with 400 errors being returned. My first test in the batch of 60 would come back 200 but the other 59 would be 400. I attempted to troubleshoot this by looking up the documentation before realizing that the schema requires a unique username and password. Upon realizing this I inserted JS syntax that randomizes the strings sent over in the corresponding values to the server. 

#### Finally, my laptop screen on my macbook died on the night before the project was due. Thankfully I have a 2015 Macbook Pro which I am using to finsih the work.