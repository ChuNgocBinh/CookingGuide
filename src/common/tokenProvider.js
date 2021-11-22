require('dotenv').config()
const jwt = require('jsonwebtoken')

const sign = (id) => {
    return jwt.sign(id, process.env.PRIVATE_KEY, { expiresIn: process.env.EXPIRES_TIME })
}

const verify = (token) => {
    return jwt.verify(token, process.env.PRIVATE_KEY);
}

module.exports = {
    sign,
    verify
}