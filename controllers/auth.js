const User = require('../models/User');
const ErrorResponse = require('../utiles/errorResponse')
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utiles/sendEmail')
const crypto = require("crypto")


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



// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async(req, res, next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: user,
    });
});

//@des Update password
//@route PUT /api/v1/auth/updatePassword
//@access private
exports.updatePassword = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    // check current password
    if (!await user.matchPassword(req.body.currendPassword)) {
        return next(new ErrorResponse('Ha Ha Password is incorrect！', 401))

    }
    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res)
})

//@des Update user details
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

//@des reset password
//@route Post /api/v1/auth/resetpassword/:resettoken
//@access private
exports.resetPassword = asyncHandler(async(req, res, next) => {
    ///get hashed token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorResponse('Invalid token', 400));
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
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

//@des forgot password
//@route Post /api/v1/auth/forgotpassword
//@access public
exports.forgotPassword = asyncHandler(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorResponse("There is no user with that email"))
    }
    //Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;
    const message = `You are receiving this email 
    because you has requested the reset of password, 
    Pease make a put request ot :\n\n ${resetUrl}`
    try {
        await sendEmail({
            email: user.email,
            subject: 'password reset token',
            message
        })
        res.status(200).json({ sucess: true, data: "Email send" })

    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new ErrorResponse('Email could not be send', 500))

    }
    res.status(200).json({
        sucess: true,
        data: user
    })
})