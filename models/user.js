require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Timestamp } = require('mongodb')

const userSchema = new mongoose.Schema({
   username: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    // connect the posts to the user schema
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
},{
    timestamps: true
})

userSchema.pre('save', async function(next){
    this.isModified('password')? this.password = await bcrypt.hash(this.password, 8):
    null;

    next()
})

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id: this._id}, process.env.SECRET)
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User