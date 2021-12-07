const tokenProvider = require('../../common/tokenProvider');
const FavoriteModel = require('./favorite.models')
const httpError = require('../../common/httpError')
const UserModel = require('../auth/auth.models')

const createFavorite = async (req, res) => {
    const data = req.body

    const filter = {
        postId: data.postId,
        userId: req.user._id,
    }

    const Favorite = await FavoriteModel.findOne(filter)

    if (Favorite) {
        throw new httpError('Bạn đã thêm vào giỏ hàng rồi')
    }

    const newFavorite = await FavoriteModel.create(filter)

    res.send({
        success: true,
        data: newFavorite,
        message: 'Thêm vào yêu thích thành công'
    })


}

const getFavorite = async (req, res) => {

    const favorite = await FavoriteModel
        .find({ userId: req.user._id })
        .populate('postId')
        .populate('userId', 'name')
    res.send({
        success: true,
        data: favorite,
    })
}

const deleteFavorite = async (req, res) => {
    const data = req.body;

    const cart = await FavoriteModel.findOneAndDelete(
        data,
        { new: true }
    )

    res.send({
        success: true,
        data: cart,
        message: 'Xóa thành công'
    })
}

module.exports = {
    createFavorite,
    getFavorite,
    deleteFavorite,
}