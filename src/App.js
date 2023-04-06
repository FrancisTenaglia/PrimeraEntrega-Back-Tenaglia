const express = require('express');

const ProductManager = require('../src/components/ProductManager');

const puerto = 8080;

const App = express;

//Aca habilito un Endpoint para solicitudes GET
server.get('/',(req, res) => {
    res.send('Servidor Express')
});

server.get('/products', (req, res) => {
    res.send(` ${req.params.products}`)
});

server.get('/products/:limit', (req, res) => {
    res.send(`Aca va a ir los productos con el limite`)
});

server.get('/products/:productId', (req, res) => {
    res.send(` ${req.params.productId}`)
});


