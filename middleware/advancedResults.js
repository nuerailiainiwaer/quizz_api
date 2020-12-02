const { populate } = require("../models/Types");

const advancedResults = (model, populate) => async(req, res, next) => {
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
    query = model.find(JSON.parse(querStr))

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
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit)

    if (populate) {
        query = query.populate(populate)
    }

    // excuting query
    const result = await query;

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

    res.advancedResults = {
        success: true,
        count: result.length,
        pagination,
        data: result
    }

    next();

}

module.exports = advancedResults;