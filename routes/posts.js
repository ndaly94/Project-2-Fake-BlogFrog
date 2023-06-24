const express = require('express')
const router = express.Router()
const postController = require('../controllers/posts')

//Index of all posts
router.get('/', userController.auth, postController.postsIndex)
//Delete a selected post at /posts/:id
router.delete('/:id', userController.auth, postDelete)
//update a post based on id 
router.put('/:id', userController.auth, postController.update)
//create a new post
router.post('/', userController.auth, postController.create)
//Show a specific post based on the ID
router.get('/:id', userController.auth, postController.show)

module.exports = router