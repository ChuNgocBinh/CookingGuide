const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    likeView: {
        type: Number,
        default: 0,
    },
    createBy: {
        type: mongoose.Types.ObjectId,
        require: true
    }
})

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;