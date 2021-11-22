function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    res.status(status).send({
        success: false,
        data: null,
        message: err.message || 'something went wrong',
    })
}

module.exports = errorHandler