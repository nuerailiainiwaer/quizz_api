const mongoose = require('mongoose');
const slugify = require('slugify')
const TypecampScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add a name"],
        unique: true,
        maxlength: [50, 'Name cannot be more than 50 character']

    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description!'],
        maxlength: [500, 'Name cannot be more than 50 character']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, {
    toJSON: { virtuals: true },
    toObject: {
        virtuals: true
    }

});
// Cascade delete questions when a types is dleted
TypecampScheme.pre('remove', async function(next) {
    await this.model('Questions').deleteMany({
        type: this._id
    });
    next();
})



//Reverse populate with virtuals
TypecampScheme.virtual('quesstions', {
    //question model
    ref: 'Questions',
    localField: "_id",
    //type in course model
    foreignField: 'type',
    justOne: false
})


// Create type sluf from the name
TypecampScheme.pre('save', function() {
    this.slug = slugify(this.name, {
        lower: true
    })
    next();

})

module.exports = mongoose.model('Types', TypecampScheme)