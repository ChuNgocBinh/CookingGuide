const tokenProvider = require('../../common/tokenProvider');
const FavoriteModel = require('./favorite.models')
const httpError = require('../../common/httpError')
const UserModel = require('../auth/auth.models')

const createCart = async (req, res) => {
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

const getCart = async (req, res) => {
    const token = req.headers.authorization;

    const tokenVerify = tokenProvider.verify(token)

    const existedUser = await UserModel.findById(tokenVerify.userId)

    if (!existedUser) {
        throw new httpError('Tài khoản không tồn tại', 400)
    }

    const cart = await CartModel
        .find({ userId: existedUser._id })
        .populate('postId')

    res.send({
        success: true,
        data: cart,
    })
}

const deleteCart = async (req, res) => {
    const data = req.body;

    const cart = await CartModel.findOneAndDelete(
        data,
        { new: true }
    )

    res.send({
        success: true,
        data: cart,
        message: 'Xóa thành công'
    })
}

const deleteAllCart = async (req, res) => {
    const deleteCart = await CartModel.deleteMany()

    res.send({
        success: true,
        data: deleteCart,
        message: 'Xóa thành công'
    })
}


module.exports = {
    createCart,
    getCart,
    deleteCart,
    deleteAllCart
}