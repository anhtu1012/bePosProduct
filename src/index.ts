import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initializeCategory, initializeProduct } from './configs/init.config';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from '../src/swagger-output.json';
import categoryRoute from './routes/category.routes';
import productRoute from './routes/product.routes';
import { initializeSocket } from './utils/socket.utils';

dotenv.config();

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT || 8080;

  // Create HTTP server
  const server = createServer(app);

  // Initialize Socket.IO
  // const io = new Server(server, {
  //   cors: {
  //     origin: '*', // Adjust for production
  //     methods: ['GET', 'POST'],
  //   },
  // });

  // Initialize socket utilities
  // initializeSocket(io);

  app.use(cors());
  app.use(express.json());

  await initializeCategory();
  await initializeProduct();

  // Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
  app.use('/api', categoryRoute);
  app.use('/api', productRoute);

  // Start server
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Error during app initialization:', err);
});
