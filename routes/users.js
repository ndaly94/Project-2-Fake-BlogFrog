const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

//create a new user at /
router.post('/', userController.createUser)
//login an existing user
router.post('/login', userController.loginUser)
// update an existing user based on ID
router.post('/:id', userController.auth, userController.deleteUser)

module.exports = router