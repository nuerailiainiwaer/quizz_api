const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user'
    },
    // password selct false we cannot return
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
        if (!this.isModified('password')) {
            next();
        }
        // below here only runs the password was actually modified so lets save that and hopefully
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    })
    //sign JWT and return 
UserSchema.methods.getSIgnedJwtTOken = function() {
        // we need secret in config file
        return jwt.sign({
            id: this._id
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })

    }
    //Match user entered password to hashwed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);

    }
    //Generate and hash passsword toekn
UserSchema.methods.getResetPasswordToken = function() {
    //generate token
    const resertToken = crypto.randomBytes(20).toString('hex');

    //hash token and set to resetpasswordtoken
    this.resetPasswordToken = crypto.createHash('sha256').update(resertToken).digest('hex');

    //Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resertToken;

}




module.exports = mongoose.model('User', UserSchema);