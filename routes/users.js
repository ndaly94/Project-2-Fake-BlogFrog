const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

//create a new user at / (WORKS)
router.post('/', userController.createUser)
//Index of all users (WORKS)
router.get('/', userController.indexUsers)
//get a user by ID (WORKS)
router.get('/:id', userController.auth, userController.getUserById)
//login an existing user (WORKS)
router.post('/login', userController.loginUser)
// update an existing user based on ID 
router.put('/:id', userController.auth, userController.updateUser)
// delete a user
router.delete('/:id', userController.auth, userController.deleteUser)

module.exports = router