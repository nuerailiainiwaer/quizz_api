const Type = require('../models/Types');
const ErrorResponse = require('../utiles/errorResponse')
const asyncHandler = require('../middleware/async');


//@des Get all types
//@route Get /api/v1/types
//@access public
exports.getTypes = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults)

});

//@des Get single types
//@route Get /api/v1/types/:id
//@access public
exports.getType = asyncHandler(async(req, res, next) => {

    const types = await Type.findById(req.params.id)

    //Correccctly formated but does not exist
    if (!types) {
        return next(new ErrorResponse(`Type is not found with id of ${req.params.id} `, 404));
    }
    res.status(200).json({ success: true, data: types })

});

//@des create new type
//@route POST /api/v1/types
//@access public
exports.createType = asyncHandler(async(req, res, next) => {
    // ///can delete
    // // add user to req.body
    // req.body.user = req.user.id;
    // //chekck for the publised bootcamp// this finds all the bootcamp by this user
    // const types = await Type.findOne({ user: req.user.id })
    //     // if the user is not an admin, they can only add one bootcamp
    // if (types && req.user.role !== 'publisher') {
    //     return next(new ErrorResponse(`The user with ID ${req.user.id} has already publised a type`))

    // }
    // ///can delete


    const type = await Type.create(req.body);
    res.status(201).json({
        success: true,
        data: type
    })
});

//@des update type
//@route PUT /api/v1/types/:id
//@access public
exports.updateType = asyncHandler(async(req, res, next) => {
    const types = await Type.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!types) {
        return next(new ErrorResponse(`Type is not found with id of ${req.params.id} `, 404));
    }
    res.status(200).json({ success: true, data: types })

});

//@des delete type
//@route delete /api/v1/types/:id
//@access public
exports.deleteType = asyncHandler(async(req, res, next) => {
    const types = await Type.findById(req.params.id);
    if (!types) {
        return next(new ErrorResponse(`Type is not found with id of ${req.params.id} `, 404));
    }
    types.remove();
    res.status(200).json({ success: true, data: {} })

});