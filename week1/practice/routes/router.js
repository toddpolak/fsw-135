const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')


router.route('/')
    .get((req, res, next) => {
        Movie.find((err, movies) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(movies)
        })
    })
    .post((req, res, next) => {
        const newMovie = new Movie(req.body)
        newMovie.save((err, savedMovie) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedMovie)
        })
    })

module.exports = router
