const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
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
})

const CartModel = mongoose.model('Cart', cartSchema)

module.exports = CartModel;