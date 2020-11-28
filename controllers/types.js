const Type = require('../models/Types');
const ErrorResponse = require('../utiles/errorResponse')
const asyncHandler = require('../middleware/async');


//@des Get all types
//@route Get /api/v1/types
//@access public
exports.getTypes = asyncHandler(async(req, res, next) => {
    let query;
    //copy req.query
    const reqQuery = {...req.query };

    //Fields to exculde
    const removeFields = ['select', 'sort', 'page', 'limit'];
    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    //Create query string
    let querStr = JSON.stringify(reqQuery);

    //loop over remove 

    // Create operators
    querStr = querStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    //Finding resources// virtual
    query = Type.find(JSON.parse(querStr)).populate('quesstions')

    //selec fields
    if (req.query.select) {
        const fileds = req.query.select.split(',').join(' ')
        query = query.select(fileds)
    }
    //sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createdAt')

    }
    ///pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Type.countDocuments();

    query = query.skip(startIndex).limit(limit)

    // excuting query
    const types = await query;

    //pagination result
    const pagination = {};
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }


    res.status(200).json({ success: true, counte: types.length, pagination: pagination, data: types })

});

//@des Get single types
//@route Get /api/v1/types/:id
//@access public
exports.getType = asyncHandler(async(req, res, next) => {

    const types = await Type.findById(req.params.id);
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