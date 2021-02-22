const express = require('express')
const router = express.Router()
const Inventory = require('../models/inventory')

router.route('/')
    .get((req, res, next) => {
        Inventory.find((err, inventory) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(inventory)
        })
    })
    .post((req, res, next) => {
        const newItem = new Inventory(req.body)
        newItem.save((err, savedItem) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedItem)
        })
    })

router.route('/:inventoryId')
    .get((req, res, next) => {
        Inventory.findById(req.params.inventoryId, (err, inventory) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(inventory)
        })
    })
    .put((req, res, next) => {
        Inventory.findOneAndUpdate(
            { _id: req.params.inventoryId },
            req.body,
            { new: true },
            (err, updatedItem) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updatedItem)
            })
    })
    .delete((req, res, next) => {
        Inventory.findOneAndDelete({ _id: req.params.inventoryId }, (err, deletedItem) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted item ${deletedItem.item} from the database`)
        })
    })

module.exports = router
