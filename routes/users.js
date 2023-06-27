const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

//create a new user at /
router.post('/', userController.createUser)
//get a user by ID
router.get('/users/:id', userController.getUserById)
//login an existing user
router.post('/login', userController.loginUser)
// update an existing user based on ID
router.put('/:id', userController.auth, userController.updateUser)
// delete a user
router.delete('/:id', userController.auth, userController.deleteUser)

module.exports = router