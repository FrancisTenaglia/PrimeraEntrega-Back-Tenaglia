// Endpoint de productos
const express = require('express');
const { ProductManager } = require('../ProductManager');

const router = express.Router();
const PARAMETERS = ['title', 'description', 'code', 'price', 'stock', 'category'];

// aca inicializo el PM importado
const productManager = new ProductManager('./productos.json');

// [GET] endpoint /products --> devuelve todos los productos existentes. Si se pasa un valor "limit" por query
// devuelve los primeros "limit" productos. 
router.get('/', async (req, res) => {
    try {
      res.send(await productManager.getProducts( req.query.limit || 0 ));
    } catch(error) {
      res.status(500).send({ error: 'Error al intentar obtener los productos' })
    } 
});

// [GET] endpoint /products/:pid --> dado un id de producto pasado por parametro, devuelve ese producto. 
// En caso de no existir, devuelve undefined
router.get('/:pid',async (req, res) => {
    try {
      res.send(await productManager.getProductsById(req.params.pid))
    } catch (error) {
      res.status(500).send({ error: `Error al intentar obtener el producto con id: ${req.params.pid}` })
    }
});

// [POST] endpoint /products --> dados los campos obligatorios pasados por el body, se agrega un nuevo
// producto al manager. En caso contrario, error por falta de parametro/s obligatorio/s
router.post('/', async(req, res) =>{
    try{
      const bodyKeys = Object.keys(req.body);
      const validParameters = PARAMETERS.every(val => bodyKeys.includes(val));
      if (validParameters) {
        await productManager.addProduct(req.body);
        res.status(200).send({ estado: 'ok', mensaje: 'El producto se agrego correctamente' });
      } else {
        res.status(422).send({ error: 'Error al intentar cargar el producto. Falta al menos un parametro obligatorio'})
      }
    } catch (error) {
      res.status(500).send({ error: 'Error al intentar cargar el producto' })
    }
});

// [PUT] endpoint /products/:pid --> dado un id de producto pasado por parametro y una serie de valores 
// pasados en el body, actualiza ese producto si existe.
router.put('/:pid', async(req, res) =>{
    try{
      const bodyKeys = Object.keys(req.body);
      const bodyValues = Object.values(req.body);
      await productManager.updateProduct(req.params.pid, bodyKeys, bodyValues);
      res.status(200).send({ estado : 'ok', mensaje: 'El producto se actualizo correctamente' });
    } catch (error) {
      res.status(500).send({ error: 'Error al intentar cargar el producto' });
    }
});

// [DELETE] endpoint /products/:pid --> dado un id de producto pasado por parametro, lo elimina de la lista.
router.delete('/:pid', async(req, res) =>{
    try{
      await productManager.deleteProduct(req.params.pid);
      res.status(200).send({ estado : 'ok', mensaje: 'El producto se elimino correctamente'});
    } catch (error) {
      res.status(500).send({ error: 'Error al intentar cargar el producto' })
    }
});

module.exports = router;