const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const HttpError = require('../models/errorModel')

const authMiddleware = async (req, res, next) => {
    const Bearer = req.headers.Authorization || req.headers.authorization

    if(Bearer && Bearer.startsWith('Bearer')) {
        const token = Bearer.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
            if(err) {
                return next(new HttpError("Unauthorized; invalid token", 403))
            }

            req.user = info;
            next()
        });
    } else {
        return next(new HttpError("Unauthorized; no token", 403))
    }
}

module.exports = authMiddleware;