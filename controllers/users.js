require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data._id })
        if(!user){
            throw new Error('no user found')
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

// we write out the save part in order to access the pre function we made that hashes the password for us
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.json({ user, token })

    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.loginUser = async (req, res) => {
    try {
        // search for the user based on email
        const user = await User.findOne({ email: req.body.email })
        // if user doesnt exist or passowrd dont match send an error message
        if(!user || !await bcrypt.compare(req.body.password, user.password)){
            throw new Error('Invalid Login')
        } else {
            // generate auth token upon correct credentials
            const token = await user.generateAuthToken()
            res.json({ user, token })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const foundUser = await User.findOne({_id: req.params._id})
        res.render(foundUser)
    } catch (error){
        res.status(400).send({ message: error.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        const updates = Object.keys(req.body)
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


exports.deleteUser = async (req, res) => {
    try {
        await req.user.deleteOne()
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}