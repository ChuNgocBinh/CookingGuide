require('express-async-errors')
const PostModel = require('./post.model')
const UserModel = require('../auth/auth.models')
const jwt = require('jsonwebtoken')

const getAllPosts = async (req, res) => {
    const posts = await PostModel.find()
    res.send({
        success: true,
        data: posts
    })
}

const getPost = async (req, res) => {
    const { postId } = req.params
    const post = await PostModel.findById(postId)
    res.send({
        success: true,
        data: post
    })
}

const createPost = async (req, res) => {
    const data = req.body;

    const newPost = await PostModel.create({
        ...data,
        createBy: req.user._id
    });

    res.send({
        success: true,
        data: newPost
    })

}

const updatePost = async (req, res) => {
    const { postId } = req.params
    const dataUpdate = req.body
    const newUpdate = await PostModel.findOneAndUpdate(
        { _id: postId },
        dataUpdate,
        { new: true },
    )
    res.send({
        success: true,
        data: newUpdate
    })

}

const deletePost = async (req, res) => {
    const { postId } = req.params

    const data = await PostModel.findOneAndDelete(
        { _id: postId },
        { new: true }
    )
    res.send({
        success: true,
        data: data
    })

}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}