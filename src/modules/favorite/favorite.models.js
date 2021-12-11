const mongoose = require('mongoose');

const FavoriteSchema = mongoose.Schema({
    postId:{
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Post'
    },
    userId:{
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'user'
    },
},{
    timestamps: true,
})

const FavoriteModel = mongoose.model('favorite', FavoriteSchema)

module.exports = FavoriteModel;