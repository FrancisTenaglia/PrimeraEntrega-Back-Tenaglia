// Endpoint de productos
import { Router } from 'express';
import fs from 'fs';

const cartsRouter = Router();
let id = 0;
let carritos = [];

cartsRouter.get('/', async (req, res) => {
    try{
      const carritoGet = await fs.promises.readFile('./routes/carrito.json', 'utf-8');
      const carritoGetConv = await JSON.parse(carritoGet);
      res.status(200).send(carritoGetConv);
  } catch(error){
    console.log(error) 
    res.status(500).send({ error: 'Error al intentar obtener el carrito' })
  }
});

// [GET] endpoint /carts/:cid --> devuelve los productos asociados a ese carrito si existe
cartsRouter.get('/:cid', async (req, res) => {
  try{
    const carritoGet = await fs.promises.readFile('./routes/carrito.json', 'utf-8');
    const carritoGetConv = await JSON.parse(carritoGet);
    const carritoBuscado = carritoGetConv.find(c => c.id === parseInt(req.params.cid));
    if(carritoBuscado) {
      res.status(200).send(carritoBuscado);
    } else {
      res.status(200).send({ message: 'El carrito que intenta buscar, no existe'});
    }
  } catch(error){
    res.status(500).send({ error: 'Error al intentar buscar el producto' });
  }
});

// [POST] endpoint /carts --> ingresa un nuevo carrito, dado un array de productos pasado por body
cartsRouter.post('/', async (req, res) => {
    try {
      id = id + 1;
      const nuevoCarrito = {
        id,
        products: req.body,
      }
      carritos.push(nuevoCarrito);
      await fs.promises.writeFile('./routes/carrito.json', JSON.stringify(carritos));
      res.status(200).send({ estado: 'ok', message: 'Carrito nuevo agregado'})
    } catch (error) {
      res.status(500).send({ error: 'Error al intentar cargar el carrito' })
    }
});

// [POST] endpoint /carts/:cid/product/:pid --> ingresa un nuevo carrito, dado un array de productos pasado por body
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  try{
    const carritoGet = await fs.promises.readFile('./routes/carrito.json', 'utf-8');
    const carritoGetConv = await JSON.parse(carritoGet);
    const carritoBuscado = carritoGetConv.find(c => c.id === parseInt(req.params.cid));
    const indexBuscado = carritoGetConv.findIndex(c => c.id === parseInt(req.params.cid));
    if(carritoBuscado) {
      const indexprodBuscado = carritoBuscado.products.findIndex(product => product.id === parseInt(req.params.pid));
      if (indexprodBuscado !== -1) {
        carritoGetConv[indexBuscado].products[indexprodBuscado].quantity++;
        await fs.promises.writeFile('./routes/carrito.json', JSON.stringify(carritoGetConv));
        res.status(200).send({ message: 'Carrito actualizado con una unidad mas al producto'});
      } else {
        // agrego nuevo producto por primera vez
        carritoGetConv[indexBuscado].products.push({ id: parseInt(req.params.pid), quantity: 1});
        await fs.promises.writeFile('./routes/carrito.json', JSON.stringify(carritoGetConv));
        res.status(200).send({ message: 'Carrito actualizado'});
        
      }
    } else {
      res.status(200).send({ message: 'El carrito al que intenta agregar un producto, no existe'});
    }
  } catch (error) {
    res.status(500).send({ message: 'Error al buscar el carrito'})
  }
});

export default cartsRouter;