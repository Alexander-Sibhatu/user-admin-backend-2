const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name is required'],
        minlength: [2, 'minimum length for name is 2 '],
        maxlength: [100, 'maximum lenght for name is 100']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
            // Regular expression to validate email format
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          },
          message: 'Invalid email address',
        },
    },
    password: {
        type: String,
        required: [true, 'user password is required'],
        min: 6,
    },
    
    phone: {
        type: Number,
        required: [true, 'user phone number is required'],
    },
    
    is_admin: {
        type: Number,
        default: 0,
    },
    
    // is_verified: {
    //     type: Number,
    //     default: 0
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    image: {
        data: Buffer,
        contentType: String
    },
    is_Banned: {
        type: Number,
        default: 0
    }
})

const User = model('User', userSchema)

module.exports = User;