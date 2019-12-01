const mongoose = require('mongoose');

//Uses the same connection as mongodb but different name
//as it is different data
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
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


