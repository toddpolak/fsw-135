const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')

// get all comments
commentRouter.route('/')
    .get((req, res, next) => {
        Comment.find((err, comments) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(comments)
        })
    })

// post a new comment based on issue id
commentRouter.route('/add/:issueId')
    .post((req, res, next) => {
        req.body.issue = req.params.issueId
        req.body.user = req.user._id

        const newComment = new Comment(req.body)

        newComment.save((err, savedComment) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedComment)
        })
    })

module.exports = commentRouter
