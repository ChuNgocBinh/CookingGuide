const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'user'
    },
    postId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Post'
    }
},{
    timestamps: true,
})

const CommentModel = mongoose.model('comment', CommentSchema);

module.exports = CommentModel;