const cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  const { id } = req.params;

  cars.getById(id)
    .then((resp) => {
      if (!resp || resp === undefined || resp === null) {
        res.status(404).json({ message: `car with id ${id} is not found` })
      } else {
        next();
      }
    }).catch(next);
}

const checkCarPayload = (req, res, next) => {
  const testCar = req.body;

  if (!testCar.vin) {
    res.status(400).json({ message: "vin is missing" });
  } else if (typeof(testCar.vin) !== "string") {
    res.status(400).json({ message: "vin is not a string" });
  } else if (!testCar.make) {
    res.status(400).json({ message: "make is missing" });
  } else if (!testCar.model) {
    res.status(400).json({ message: "model is missing" });
  } else if (!testCar.mileage) {
    res.status(400).json({ message: "mileage is missing" });
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;

  if (!vinValidator.validate(vin) ) {
    res.status(400).json({ message: `vin ${vin} is invalid` });
  } else {
    next();
  }
}

const checkVinNumberUnique = (req, res, next) => {
  const { vin } = req.body;

  cars.getByVin(vin)
    .then((resp) => {
      if (!resp || resp === undefined || resp === null || resp === []) {
        next();
      } else {
        res.status(400).json({ message: `vin ${vin} already exists` })
      }
    }).catch(next);
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}