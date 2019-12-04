const express = require('express')
const router = new express.Router()
const Task = require("../models/task")

router.get('/task', async (req, res) => {

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

router.get('/task/:id', async (req, res) => {
    const task_id = req.params.id

    try {
        const task = await Task.findById(task_id)
    } catch(e) {
        console.log(e)
    }
})

router.post('/task', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(404).send(e)
    }
});

router.patch('/task/:id', async (req, res) => {
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

router.delete('/task/:id', async (req, res) => {

    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            return res.status(404).send({error: "Unable to find user"})
        }
        res.send(task)

    } catch (e) {
        res.status(500)
    }
})

module.exports = router