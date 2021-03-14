const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Comment Blueprint
const commentSchema = new Schema({
    voted: {
        type: Boolean,
        required: true
    },
    issue: {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)
