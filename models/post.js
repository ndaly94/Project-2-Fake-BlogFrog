const { model, Schema } = require('mongoose')


const postSchema = new Schema ({ 
    title: { type: String, required: true},
    body: { type: String, required: true },
    // link the posts to a specific user
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, {
    timestamps: true
})

const Post = model('Post', postSchema)

module.exports = Post