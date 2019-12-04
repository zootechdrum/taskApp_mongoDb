const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()

const port = process.env.PORT || 3000;


//parses incoming json converts it into an object
app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(404).send(e)
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        if (!users) {
            return res.status(404).send()
        }
        //sends user info if it was successful
        console.log("hek")
        res.send(users);
    } catch (e) {
        res.status(500)
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id)
    } catch(e) {
        console.log(e)
    }
})

app.patch('/users/:id', async (req, res) => {
    //makes sure we are only upating properties in our user model.

    const update = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = update.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400)({error: "invalid updates"})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators: true})
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(404).send()
    }
})

app.get('/task', async (req, res) => {

    try {
        const  tasks = await Task.find({})
        if(!tasks) {
            return res.status(404).send()
        }
        res.send(tasks)
    } catch(e) {
        console.log(e)
    }
})

app.get('/task/:id', async (req, res) => {
    const task_id = req.params.id

    try {
        const task = await Task.findById(task_id)
    } catch(e) {
        console.log(e)
    }
})

app.post('/task', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(404).send(e)
    }
});

app.patch('/task/:id', async (req, res) => {
    //makes sure we are only upating properties in our user model.

    const update = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOperation = update.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400)({error: "invalid updates"})
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators: true})
        console.log(task)
        if (!task) {
            console.log("")
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(404).send({error: e})
    }
})

app.listen(port, () => {
    console.log("Server is up and running on port" + port)
})