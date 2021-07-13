const express = require('express');
const cars = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid} = require('./cars-middleware');

const router = express.Router();

router.get("/", (req, res, next) => {
    cars.getAll()
        .then((resp) => {
            res.status(200).json(resp);
        }).catch(next);
})

router.get("/:id", [checkCarId], (req, res, next) => {
    const { id } = req.params;

    cars.getById(id)
        .then((resp) => {
            res.status(200).json(resp);
        }).catch(next);
})

router.post("/", [checkCarPayload, checkVinNumberValid, checkVinNumberUnique], (req, res, next) => {
    const neoCar = req.body;

    cars.create(neoCar)
        .then((resp) => {
            cars.getById(resp)
                .then(r2 => {
                    res.status(201).json(r2);
                }).catch(next);
        }).catch(next);
})

router.use((err, req, res, next) => {
    const status = err.status || 500;

    res.status(status).json({
        message: "Error in car router",
        err: err.message
    });

    if (err.message === 0) {
        next();
    }
})

module.exports = router;