
const express = require('express');
const {ProductManager} = require('./components/ProductManager');

const puerto = 8080;
const server = express();
server.use(express.json);
server.use(express.urlencoded({extended: true}));

//Aca inicializo el PM importado
const productManager = new ProductManager('./productos.json');

//Este endpoint tiene uqe devolver en este caso si no tiene limit, pero con un limit =5 por ejemplo mostraria los primeros 5, sino todos
server.get('/products', (req, res) => {
    res.json(productManager.getProducts(req.query.limit ||0));
});

//Este endpoint tiene que devolver por ejemplo /products/2 el producto con el Id=2 y si no hay producto  con ese id, tiene que devolver un objeto con un error
server.get('/products/:productId', (req, res) => {
    res.json(productManager.getProductsById(req.params.productId))
});

server.listen(puerto, () => {
    console.log('Corriendo en el puerto ', puerto);
});





