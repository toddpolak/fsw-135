const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')

authRouter.route('/')
    .get((req, res, next) => {
        User.find((err, users) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(users)
        })
    })
    .post((req, res, next) => {
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedUser)
        })
    })

authRouter.route('/:userId')
    .get((req, res, next) => {
        User.findById(req.params.userId, (err, user) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(user)
        })
    })
    .put((req, res, next) => {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            req.body,
            { new: true },
            (err, updatedUser) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updatedUser)
            })
    })
    .delete((req, res, next) => {
        User.findOneAndDelete({ _id: req.params.userId }, (err, deletedUser) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted item ${deletedUser.username} from the database`)
        })
    })

module.exports = authRouter
