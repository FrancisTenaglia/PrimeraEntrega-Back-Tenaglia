import express from 'express';
import { engine } from 'express-handlebars';
import router from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewRouter from './routes/views.router.js';
import { Server } from 'socket.io';

const PUERTO = 3000;
const PUERTO_WEBSOCKET = 8080;
const server = express();
const httpServer = server.listen(PUERTO_WEBSOCKET, () => {
  console.log(`Servidor socket.io corriendo en el puerto ${PUERTO_WEBSOCKET}`);
});
const wss = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api/products', router);
server.use('/api/carts', cartsRouter);
server.use('/realtimeproducts', viewRouter);

// motor de plantillas
server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', './views');

// evento socket.io
wss.on('connection', (socket) => {
  console.log(`Nuevo cliente conectado: ${socket.id}`);

  socket.emit('server_confirm', 'Conexion recibida');

  socket.on('disconnect', (reason) => {
    console.log(`Cliente desconectado (${socket.id}): ${reason}`);
  })

  //escuchamos eventos desde el cliente
  socket.on('solicitud_client', (data) => {
    console.log(data);
  })
});

server.listen(PUERTO, () => {
  console.log(`Servidor api static corriendo en el puerto ${PUERTO}`);
});
