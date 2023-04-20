const express = require('express');
const router = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const PUERTO = 8080;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api/products', router);
server.use('/api/carts', cartsRouter)

server.listen(PUERTO, () => {
  console.log(`Corriendo en el puerto ${PUERTO}`);
});
