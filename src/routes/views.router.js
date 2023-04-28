import { Router } from "express";
import ProductManager from '../ProductManager.js';
import { __dirname } from '../utils.js';

const viewRouter = Router();
const productManager = new ProductManager((`${__dirname}/../src/productos.json`));

viewRouter.get('/', async (req, res) => {
    try {
      const productos = await productManager.getProducts( req.query.limit || 0 ); 
      //res.send(productos);
      res.render('realTimeProducts', {products: productos });
    } catch(error) {
      res.status(500).send({ error: 'Error al intentar obtener los productos' })
    } 
});

export default viewRouter;