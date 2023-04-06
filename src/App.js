const express = require('express');

const ProductManager = require('../src/components/ProductManager');

const puerto = 8080;

const App = express;

//Aca inicializo el PM importado
const inicializo = new ProductManager('./productos.json');

//Este endpoint tiene que devolver todos los productos en /products
App.get('/products', (req, res) => {
    res.json(inicializo.getProducts());
});

//Este endpoint tiene uqe devolver en este caso /products?limit=5, los primeros 5 productos
App.get('/productsLimit', (req, res) => {
    res.json(inicializo.getProducts(req.params.limit))
});

//Este endpoint tiene que devolver por ejemplo /products/2 el producto con el Id=2 y si no hay producto  con ese id, tiene que devolver un objeto con un error
App.get('/products/:productId', (req, res) => {
    res.json(inicializo.getProductsById(req.params.productId))
});

App.listen(8080, () => {
    console.log('Corriendo en el puerto 8080');
  });





