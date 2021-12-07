require('express-async-errors')
const PostModel = require('./post.model')
const UserModel = require('../auth/auth.models')
const jwt = require('jsonwebtoken')
const slugify = require('slugify');

const getAllPosts = async (req, res) => {
    const { keyword, rule, sortField, sortDirection, skip, limit } = req.query;

    const keywordFilter = keyword ? {
        slug: { $regex: new RegExp(slugify(keyword), 'i') }
    } : {};
    const ruleFilter = rule ? { rule } : {};

    const sortDirectionParams = sortDirection ? Number(sortDirection) : -1
    const sortFieldParams = sortField ? {
        [sortField]: sortDirectionParams
    } : {};

    const paginations = {
        skip: skip ? Number(skip) : 0,
        limit: limit ? Number(limit) : 8
    }

    const filter = {
        ...keywordFilter,
        ...ruleFilter,
    }

    const posts = await PostModel
        .find(filter)
        .sort(sortFieldParams)
        .skip(paginations.skip)
        .limit(paginations.limit)
    res.send({
        success: true,
        data: posts
    })
}


const getPost = async (req, res) => {
    const { postId } = req.params
    const post = await PostModel
        .findById(postId)
        .populate('createBy', 'name')
    res.send({
        success: true,
        data: post
    })
}

const createPost = async (req, res) => {
    const data = req.body;

    const newPost = await PostModel.create({
        ...data,
        slug: slugify(data.title),
        createBy: req.user._id
    });

    res.send({
        success: true,
        data: newPost,
        message: 'Tạo bài viết thành công'
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