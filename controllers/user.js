const Type = require('../models/Types');
const ErrorResponse = require('../utiles/errorResponse')
const asyncHandler = require('../middleware/async');

const User = require('../models/User');

//@des Get all users
//@route get/api/v1/users
//@access private/Admin
exports.getUsers = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults)
});

//@des Get single User
//@route get/api/v1/users/:id
//@access  private/Admin
exports.getUser = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
        success: true,
        data: user
    })
});

//@des Create User
//@route POST /api/v1/users
//@access  private/Admin

exports.createUser = asyncHandler(async(req, res, next) => {
    const user = await User.create(req.body)
    res.status(201).json({
        success: true,
        data: user
    })
});

//@des Update User
//@route PUT /api/v1/users/id
//@access  private/Admin

exports.updateUser = asyncHandler(async(req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        data: user
    })
});


//@des Dekete User
//@route delete /api/v1/users/id
//@access  private/Admin

exports.deleteUser = asyncHandler(async(req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        data: {}
    })
});