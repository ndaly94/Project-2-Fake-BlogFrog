const express = require('express')
const router = express.Router()
const postController = require('../controllers/posts')
const userController = require('../controllers/users')

//create a new post
router.post('/', userController.auth, postController.createNewPost)
//Index of all posts
router.get('/', userController.auth, postController.indexPosts)
//Show a specific post based on the ID
router.get('/:id', userController.auth, postController.showOnePost)
//update a post based on id 
router.put('/:id', userController.auth, postController.updatePosts)
//Delete a selected post at /posts/:id
router.delete('/:id', userController.auth, postController.deletePost)

module.exports = router