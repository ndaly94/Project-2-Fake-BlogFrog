const express = require('express')
const router = express.Router()
const postController = require('../controllers/posts')
const userController = require('../controllers/users')

//create a new post (WORKS)
router.post('/', userController.auth, postController.createNewPost)
//Index of all posts (WORKS)
router.get('/', userController.auth, postController.indexPosts)
//Show a specific post based on the ID (WORKS)
router.get('/:id', userController.auth, postController.showOnePost)
//update a post based on id (WORKS)
router.put('/:id', userController.auth, postController.updatePosts)
//Delete a selected post at /posts/:id (WORKS)
router.delete('/:id', userController.auth, postController.deletePost)

module.exports = router