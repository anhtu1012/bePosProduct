import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { initializeCategory, initializeProduct } from './configs/init.config';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from '../src/swagger-output.json';
import categoryRoute from './routes/category.routes';
import productRoute from './routes/product.routes';
dotenv.config();

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT || 8080;

  app.use(cors());

  app.use(express.json());

  await initializeCategory();
  await initializeProduct();
  // Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
  app.use('/api', categoryRoute);
  app.use('/api', productRoute);
  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Error during app initialization:', err);
});
