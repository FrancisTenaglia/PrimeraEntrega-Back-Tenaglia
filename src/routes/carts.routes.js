// Endpoint de productos
const express = require('express');

const cartsRouter = express.Router();

let carrito = [];
let id = 0;

cartsRouter.get('/',async (req, res) => {
    res.send({ message: carrito})
});

// [GET] endpoint /carts/:cid --> devuelve los productos asociados a ese carrito si existe, sino un array vacio 
cartsRouter.get('/:cid',async (req, res) => {
    const productosBuscados = carrito.find(c => c.id === parseInt(req.params.cid)) || [];
    if (productosBuscados) {
        console.log('Producto encontrado: ', productosBuscados.products);
        res.status(200).send({ message: 'Carrito con productos encontrado', data: productosBuscados})
    }
    else
        res.status(500).send({ error: 'Error al intentar buscar el producto' })
});

// [POST] endpoint /carts --> ingresa un nuevo carrito, dado un array de productos pasado por body
cartsRouter.post('/', async(req, res) =>{
    try{
      id = id + 1;
      const nuevoCarrito = {
        id,
        products: req.body,
      }
      carrito.push(nuevoCarrito);
      res.status(200).send({ message: 'Carrito nuevo agregado'})
    } catch (error) {
      res.status(500).send({ error: 'Error al intentar cargar el carrito' })
    }
});

module.exports = cartsRouter;