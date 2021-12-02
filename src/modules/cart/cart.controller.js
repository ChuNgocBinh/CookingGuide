const tokenProvider = require('../../common/tokenProvider');
const CartModel = require('./cart.models')
const httpError = require('../../common/httpError')
const UserModel = require('../auth/auth.models')

const createCart = async (req, res) => {
    const token = req.headers.authorization;
    const data = req.body
    if (!token) {
        throw new httpError('Bạn chưa đăng nhập', 400)
    }

    const tokenVerify = tokenProvider.verify(token)

    const existedUser = await UserModel.findById(tokenVerify.userId)

    if (!existedUser) {
        throw new httpError('Tài khoản không tồn tại', 400)
    }

    const filter = {
        postId: data.postId,
        userId: existedUser._id,
    }

    const cart = await CartModel.findOne(filter)

    if (cart) {
        throw new httpError('Bạn đã thêm vào giỏ hàng rồi')
    }

    const newCart = await CartModel.create({
        postId: data.postId,
        userId: existedUser._id,
    })

    res.send({
        success: true,
        data: newCart,
        message: 'Thêm vào giỏ hàng thành công'
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