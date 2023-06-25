const express = require('express')
const router = express.Router()
const postController = require('../controllers/posts')
const userController = require('../controllers/users')

//Index of all posts
router.get('/posts', userController.auth, postController.indexPosts)
//Delete a selected post at /posts/:id
router.delete('/posts/:id', userController.auth, postController.deletePost)
//update a post based on id 
router.put('/posts/:id', userController.auth, postController.updatePosts)
//create a new post
router.post('/posts', userController.auth, postController.createNewPost)
//Show a specific post based on the ID
router.get('/posts/:id', userController.auth, postController.showOnePost)

module.exports = router