require('dotenv').config();
const express = require('express');
require('express-async-errors')
const mongoose = require('mongoose');
const path = require('path');
const postRouter = require('./modules/post/post.router')
const authRouter = require('./modules/auth/auth.router')
const UploadRouter = require('./modules/upload/upload.router')
const CartRouter = require('./modules/cart/cart.router')
const FavoriteRouter = require('./modules/favorite/favorite.router')
const CommentRouter = require('./modules/comment/comment.router')
const errorHandler = require('./common/errorHandle')
const app = express();


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/public/index.html'));
})

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('mongodb connected successfully');
    app.use(express.json())
    app.use(express.static('public'))
    app.use('/api/posts', postRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/upload', UploadRouter)
    app.use('/api/cart', CartRouter)
    app.use('/api/favorite', FavoriteRouter)
    app.use('/api/comments', CommentRouter)
    app.use(errorHandler)

    app.listen(process.env.PORT, (err) => {
        if (err) throw err;
        console.log('server connected');
    })
}
main()
