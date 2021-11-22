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

    if (password.length < 6) {
        throw new HttpError('mat khau phai hon 6 ky tu', 400)
    }

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
        }
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
        throw new HttpError('password khong dung', 400)
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
    })
}

module.exports = {
    register,
    signIn
}