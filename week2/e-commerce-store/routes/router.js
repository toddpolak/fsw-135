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

module.exports = router
