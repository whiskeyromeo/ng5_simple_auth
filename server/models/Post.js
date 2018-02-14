var mongoose = require('mongoose')

// Need to have users in a schema in order to access the pre save event
var postSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: Number,
    updatedAt: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
})

module.exports = mongoose.model('Post', postSchema)