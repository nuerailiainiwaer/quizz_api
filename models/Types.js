const mongoose = require('mongoose');
const BootcampScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add a name"],
        unique: true,
        maxlength: [50, 'Name cannot be more than 50 character']

    },
    // slug: String,

    description: {
        type: String,
        required: [true, 'Please add a description!'],
        maxlength: [500, 'Name cannot be more than 50 character']
    }

})

module.exports = mongoose.model('Types', BootcampScheme)