// Endpoint de productos
const express = require('express');

const cartsRouter = express.Router();

cartsRouter.get('/',async (req, res) => {
    res.status(200).send({ message: 'andando'})
});

module.exports = cartsRouter;