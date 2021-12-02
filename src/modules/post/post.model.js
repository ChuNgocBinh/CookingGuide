const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    imgUrl: {
        type: String,
        require: true,
    },
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
    buyCount: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    createBy: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'user'
    },
    rate: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: 'user'
            },
            star: Number,
        }
    ],
    rule: {
        type: String,
        default: 'food',
    }
})

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;