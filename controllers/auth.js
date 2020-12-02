const User = require('../models/User');
const ErrorResponse = require('../utiles/errorResponse')
const asyncHandler = require('../middleware/async');


//@des Register User
//@route post /api/v1/auth/register
//@access public

exports.register = asyncHandler(async(req, res, next) => {
    const { name, email, password, role } = req.body;
    //create our user
    const user = await User.create({
        name,
        email,
        password,
        role
    });
    //create token 
    //method is lower case so it should be user, statick is uppercase
    // const token = user.getSIgnedJwtTOken();
    // res.status(200).json({ sucess: true, token: token })
    sendTokenResponse(user, 200, res)
})


//@des Login user
//@route Post /api/v1/auth/login
//@access public

exports.login = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;
    //validate email & password
    if (!email || !password) {
        return next(new ErrorResponse('please provide an email and passrod', 400))
    }

    //Check for user// becase password is not gonna inclued we should add password like selct
    const user = await User.findOne({ email: email }).select('+password');
    if (!user) {
        //401 unauthorized 
        return next(new ErrorResponse('invalide credential', 401))
    }
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse('Invalide credential', 401))

    }

    // //method is lower case so it should be user, statick is uppercase
    // const token = user.getSIgnedJwtTOken();
    // res.status(200).json({ sucess: true, token: token })
    sendTokenResponse(user, 200, res)
})

//get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSIgnedJwtTOken();
    //only accesed by client site script

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    if (process.env.NODE_ENV === "production") {
        options.secure = true

    }
    res.status(statusCode).cookie('token', token, options)
        .json({
            sucess: true,
            token
        })

}

//@des Get Current logged in user
//@route Post /api/v1/auth/me
//@access private
exports.getMe = asyncHandler(async(req, res, next) => {
    console.log(req.user)
    const user = await User.findById(req.user.id);
    res.status(200).json({
        sucess: true,
        data: user
    })
})