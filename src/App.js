const express = require('express');

const ProductManager = require('../src/components/ProductManager');

const puerto = 8080;

const App = express;

//Aca habilito un Endpoint para solicitudes GET
server.get('/',(req, res) => {
    res.send('Servidor Express')
});

//Este endpoint tiene que devolver todos los productos en /products
server.get('/products', (req, res) => {
    res.send(` ${products}`)
});

//Este endpoint tiene uqe devolver en este caso /products?limit=5, los primeros 5 productos
server.get('/productsLimit', (req, res) => {
    res.send(` ${req.query.limit}`)
});

//Este endpoint tiene que devolver por ejemplo /products/2 el producto con el Id=2 y si no hay producto  con ese id, tiene que devolver un objeto con un error
server.get('/products/:productId', (req, res) => {
    res.send(` ${req.params.productId}`)
});






