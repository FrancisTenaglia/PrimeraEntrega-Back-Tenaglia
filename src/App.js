const express = require('express');
const {ProductManager} = require('./components/ProductManager');

const puerto = 8080;
const server = express();
server.use(express.urlencoded({extended: true}));

//Aca inicializo el PM importado
const productManager = new ProductManager('./components/productos.json');

//Endpoint con query
server.get('/products', async (req, res) => {
    try{
        res.send(await productManager.getProducts(req.query.limit ||0));
    } catch(error){
        res.status(500).send({error: 'Error al obtener los produtos'})
    } 

});

//Este endpoint tiene que devolver por ejemplo /products/2 el producto con el Id=2 y si no hay producto  con ese id, tiene que devolver un objeto con un error
server.get('/products/:pid',async (req, res) => {
    try{
        res.send(await productManager.getProductsById(req.params.pid))
    } catch(error){
        res.status(500).send({error: 'Error al obtener el elemento'})
    }
});

server.listen(puerto, () => {
    console.log(`Corriendo en el puerto ${puerto}`);
});





