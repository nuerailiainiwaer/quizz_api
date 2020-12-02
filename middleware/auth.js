const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const errorReponse = require('../utiles/errorResponse');
const User = require('../models/User');


//Protect routes
exports.protect = asyncHandler(async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new errorReponse('Not authorized to access this route', 401));
    }

    //verify token 
    try {
        //Verity token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next();
    } catch {
        return next(new errorReponse('Not authorized to access this route', 401));
    }
})

//Grant access to specif roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        /// req.user.role is admin or publisher
        if (!roles.includes(req.user.role)) {
            return next(new errorReponse(`User role ${req.user.role} is not authorized to acccess this route`, 403));
        }
        next();
    }
}