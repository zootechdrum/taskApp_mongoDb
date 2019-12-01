const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    password: {
        type: String,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error("password needs to be longer")
            }else if (value.includes('password')) {
                throw new Error("Password can't be password")
            }
        }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        //required is to make sure email is provided
        required: true,
        trim: true,
        lowercase: true,
        //custom validation using validator library
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    age: {
        type: Number,
        default: 0
    }
})

module.exports = User;