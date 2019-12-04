const express = require('express')
const router = new express.Router()
const User = require("../models/user")

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    console.log(user)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        if (!users) {
            return res.status(404).send()
        }
        res.send(users);
    } catch (e) {
        res.status(500)
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id)
    } catch(e) {
        console.log(e)
    }
})

router.patch('/users/:id', async (req, res) => {
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

router.delete('/users/:id', async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            return res.status(404).send({error: "Unable to find user"})
        }
        res.send("Delete the user")

    } catch (e) {
        res.status(500)
    }
})

module.exports = router