require('express-async-errors')
const UserModel = require('./auth.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const tokenProvider = require('../../common/tokenProvider')
const HttpError = require('../../common/httpError')


const register = async (req, res) => {
    const { name, email, password } = req.body;

    const existedUser = await UserModel.findOne({ name });

    if (existedUser) {
        throw new HttpError('tai khoan da ton tai', 400)
    }

    // if (password.length < 6) {
    //     throw new HttpError('mat khau phai hon 6 ky tu', 400)
    // }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newDataUser = {
        name, email, password: hashPassword
    }

    const newUser = await UserModel.create(newDataUser)
    res.send({
        success: true,
        data: {
            id: newUser._id,
            name: newUser.name
        },
        message: 'Đăng ký thành công'
    })

}

const signIn = async (req, res) => {
    const { name, password } = req.body;

    const existedUser = await UserModel.findOne({ name })

    if (!existedUser) {
        throw new HttpError('Tai khoan khong ton tai', 400)
    }

    const hashPassword = existedUser.password;

    const matchedPassword = bcrypt.compareSync(password, hashPassword)

    if (!matchedPassword) {
        throw new HttpError('Mật khẩu không đúng', 400)
    }

    const identity = {
        userId: existedUser._id,
    }

    const token = tokenProvider.sign(identity)

    res.send({
        success: true,
        data: {
            id: existedUser._id,
            name: existedUser.name,
            token
        },
        message: 'Đăng nhập thành công'
    })
}

const getUser = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new HttpError('Khong co token', 400)
    }

    const tokenVerify = tokenProvider.verify(token)

    const existedUser = await UserModel.findById(tokenVerify.userId)

    if (!existedUser) {
        throw new HttpError('User khong ton tai')
    }

    res.send({
        success: true,
        data: existedUser
    })
}

const updateUser = async (req, res) => {
    const token = req.headers.authorization;
    const dataUpdate = req.body;
    if (!token) {
        throw new HttpError('Khong co token', 400)
    }

    const tokenVerify = tokenProvider.verify(token)

    const existedUser = await UserModel.findById(tokenVerify.userId)

    if (!existedUser) {
        throw new HttpError('User khong ton tai')
    }

    const newUpdate = await UserModel.findOneAndUpdate(
        { _id: existedUser._id },
        dataUpdate,
        { new: true }
    )

    res.send({
        success: true,
        data: newUpdate,
        message: 'Cập nhật thành công'
    })
}


module.exports = {
    register,
    signIn,
    getUser,
    updateUser
}