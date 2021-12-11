const CommentModel = require('./comment.models');

const getComments = async (req, res) => {
    const { postId, sortField, sortDirection, skip, limit } = req.query;

    const postIdFilter = postId ? postId : {}
    const sortDirectionParams = sortDirection ? Number(sortDirection) : -1
    const sortFieldParams = sortField ? {
        [sortField]: sortDirectionParams
    } : {};

    const paginations = {
        skip: skip ? Number(skip) : 0,
        limit: limit ? Number(limit) : 8
    }

    const filter = {
        ...postIdFilter,
    }

    const comments = await CommentModel
        .find(filter)
        .sort(sortFieldParams)
        .skip(paginations.skip)
        .limit(paginations.limit)
        .populate({
            path: 'createdBy',
            select: 'name imgUrl'
        })
    res.send({
        success: true,
        data: comments
    })
}

const createComment = async (req, res) => {
    const user = req.user
    const data = req.body;

    const newComment = await CommentModel.create({
        ...data,
        createdBy: user._id,
    })

    res.send({
        success: true,
        data: newComment,
        message: 'Tạo comment thành công'
    })
}

module.exports = {
    getComments,
    createComment
}
