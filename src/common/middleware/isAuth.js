const jwt = require('jsonwebtoken');
const UserModel = require('../../modules/auth/auth.models')
const tokenProvider = require('../tokenProvider')
const HttpError = require('../../common/httpError')

const isAuth = async (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        throw new HttpError('khong co token', 400)
    }

    const verify = tokenProvider.verify(token);


    if (!verify.userId) {
        throw new HttpError('token valid', 400)
    }
    console.log(verify.userId);

    const existedUser = await UserModel.findById(verify.userId)

    if (!existedUser) {
        throw new HttpError('User khong ton tai', 400)
    }

    req.user = existedUser
    next()

}
module.exports = isAuth