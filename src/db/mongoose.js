const mongoose = require('mongoose');
const validator = require('validator');


//Uses the same connection as mongodb but different name
//as it is different data
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

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

const Task = mongoose.model("Task", {
    description: {
        type: String,
        required : true,
        trime: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const me = new User({
    name: "Jizzler",
    age: 28,
    email: 'zootechdrum@gmail.com',
    password: 'pasword123'
})

me.save().then((me) => {
    console.log(me)
}).catch((error) => {
    console.log(error)
})

