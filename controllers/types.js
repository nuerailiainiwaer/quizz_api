//@des Get all types
//@route Get /api/v1/types
//@access public
exports.getTypes = (req, res, next) => {
    res.status(400).json({ success: true, msg: 'Show all types' })
}

//@des Get single types
//@route Get /api/v1/types/:id
//@access public
exports.getType = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Show type ${req.params.id} ` })
}

//@des create new type
//@route POST /api/v1/types
//@access public
exports.createType = (req, res, next) => {
    res.status(400).json({ success: true, msg: 'Create new type' })
}

//@des update type
//@route PUT /api/v1/types/:id
//@access public
exports.updateType = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update type ${req.params.id} ` })
}

//@des delete type
//@route delete /api/v1/types/:id
//@access public
exports.deleteType = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete type ${req.params.id} ` })

}