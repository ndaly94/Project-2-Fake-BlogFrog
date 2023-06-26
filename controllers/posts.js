const Post = require('../models/post')
const User = require('../models/user')

exports.createNewPost = async function (req, res){
    try {
        req.body.user = req.user._id
        const post = await Post.create(req.body)
        req.user.posts?
        req.user.posts.addToSet({ _id: post._id }):
        req.user.posts = [{ _id: post._id }]
        await req.user.save()
        console.log(post, "it works")
        res.json(todo)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

// show a specific post
exports.showOnePost = async function(req, res){
    try {
        const post = await Post.findOne({ _id: req.params._id })
        res.json(post)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.indexPosts = async function(req, res) {
    try {
        const post = await Post.find( { completed: true, user: req.user._id })
        res.json(posts)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updatePosts = async function(req, res){
    try {
        const posts = await Post.findByIdAndUpdate({ _id: req.params._id }, req.body, { new: true })
        res.json(post)
    } catch (error) {
     res.status(400).json({ message: error.message })   
    }
}

exports.deletePost = async function(req, res){
    try {
        const post = await Post.findByIdAndUpdate({ _id: req.params._id })
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}