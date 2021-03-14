const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue')

/*
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
*/

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

/*
issueRouter.route('/:issueId')
    .get((req, res, next) => {
        Issue.findById(req.params.issueId, (err, issue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(issue)
        })
    })
    .put((req, res, next) => {
        Issue.findOneAndUpdate(
            { _id: req.params.issueId },
            req.body,
            { new: true },
            (err, updatedIssue) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updatedIssue)
            })
    })
    .delete((req, res, next) => {
        Issue.findOneAndDelete({ _id: req.params.issueId }, (err, deletedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted item ${deletedIssue.title} from the database`)
        })
    })

// up vote an issue
issueRouter.route('/upVote/:issueId')
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

// todo: number of votes based on issue id
*/

module.exports = issueRouter
