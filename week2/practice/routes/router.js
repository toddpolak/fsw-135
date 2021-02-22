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

router.route('/:movieId')
    .get((req, res, next) => {
        Movie.findById(req.params.inventoryId, (err, movie) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(movie)
        })
    })
    .put((req, res, next) => {
        Movie.findOneAndUpdate(
            { _id: req.params.movieId }, // find this one to update
            req.body, // update the object with this data
            { new: true }, // send back the updated version please
            (err, updatedMovie) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updatedMovie)
            })
    })
    .delete((req, res, next) => {
        Movie.findOneAndDelete({ _id: req.params.movieId }, (err, deletedItem) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database`)
        })
    })

module.exports = router
