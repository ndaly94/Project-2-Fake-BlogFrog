const { model, Schema } = required('mongoose')

const postSchema = new Schema ({ 
    title: { type: String, required: true},
    completed: { type: Boolean, required: true },
    // link the Posts to a specific user
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, {
    timestamps: true
})

const Post = model('Post', postSchema)

module.export = Post