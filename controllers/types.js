const Type = require('../models/Types');
//@des Get all types
//@route Get /api/v1/types
//@access public
exports.getTypes = async(req, res, next) => {
    try {
        const types = await Type.find();
        res.status(200).json({ success: true, counte: types.length, data: types })

    } catch {
        res.status(200).json({
            success: false
        })

    }

}

//@des Get single types
//@route Get /api/v1/types/:id
//@access public
exports.getType = async(req, res, next) => {
    try {
        const types = await Type.findById(req.params.id);

        //Correccctly formated but does not exist
        if (!types) {
            return res.status(400).json({
                success: false
            })
        }
        res.status(200).json({ success: true, data: types })
    } catch (err) {
        next(err);
        // res.status(400).json({
        //     success: false
        // })

    }
}

//@des create new type
//@route POST /api/v1/types
//@access public
exports.createType = async(req, res, next) => {

    try {
        const type = await Type.create(req.body);
        console.log(type)
        res.status(201).json({
            success: true,
            data: type
        })
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }
    // console.log(req.body)
    // res.status(400).json({ success: true, msg: 'Create new type' })

}

//@des update type
//@route PUT /api/v1/types/:id
//@access public
exports.updateType = async(req, res, next) => {
    try {
        const types = await Type.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!types) {
            return res.status(400).json({
                success: false
            })
        }
        res.status(200).json({ success: true, data: types })
    } catch {
        res.status(400).json({ success: false })
    }


}

//@des delete type
//@route delete /api/v1/types/:id
//@access public
exports.deleteType = async(req, res, next) => {
    try {
        const types = await Type.findByIdAndDelete(req.params.id);
        if (!types) {
            return res.status(400).json({
                success: false
            })
        }
        res.status(200).json({ success: true, data: {} })
    } catch {
        res.status(400).json({ success: false })
    }

}