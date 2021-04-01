const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue')

// get all issues
issueRouter.route('/')
    .get((req, res, next) => {
        Issue.find((err, issues) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(issues)
        })
    })

// post new issue with user id
issueRouter.route('/')
    .post((req, res, next) => {
        req.body.user = req.user._id

        const newIssue = new Issue(req.body)

        newIssue.save((err, savedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedIssue)
        })
    })

// get all issues based on user id
issueRouter.route('/user')
    .get((req, res, next) => {
        Issue.find({ user: req.user._id }, (err, issues) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(issues)
        })
    })

// up vote an issue
issueRouter.route('/upvote/:issueId')
    .put((req, res, next) => {
        Issue.findOneAndUpdate(
            { _id: req.params.issueId },
            { $inc: { votes: 1 }},
            { new: true },
            (err, updatedIssue) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updatedIssue)
            })
    })

// down vote an issue
issueRouter.route('/downVote/:issueId')
    .put((req, res, next) => {
        Issue.findOneAndUpdate(
            { _id: req.params.issueId },
            { $inc: { votes: -1 }},
            { new: true },
            (err, updatedIssue) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updatedIssue)
            })
    })

module.exports = issueRouter
