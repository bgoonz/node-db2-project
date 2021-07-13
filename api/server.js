const express = require("express");
const cors = require('cors');

const carsRouter = require('./cars/cars-router');

const server = express()
server.use(express.json() );
server.use(cors() );

// DO YOUR MAGIC

server.use("/api/cars", carsRouter);

server.use("*", (req, res) => {
    res.status(404).json({
        message: "That endpoint does not exist."
    })
})

module.exports = server
