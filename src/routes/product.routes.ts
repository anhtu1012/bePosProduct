import { Router } from 'express';
import {
  getAllProductsHandler,
  getProductDetailHandler,
  createProductHandler,
  createManyProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from '../controllers/product.controller';
import { validateProductReq } from '../middlewares/product.middleware';

const router = Router();

// GET list with limit/offset/name
router.get(
  '/product',
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Get all products'
     #swagger.parameters['limit'] = { in: 'query', type: 'integer' }
     #swagger.parameters['offset'] = { in: 'query', type: 'integer' }
     #swagger.parameters['name'] = { in: 'query', type: 'string' }
     #swagger.responses[200] = {
       description: 'List of products',
        schema: { type: 'array', items: { $ref: '#/components/schemas/Product' } }
    }
  */
  getAllProductsHandler
);

// GET detail
router.get(
  '/product/:id',
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Get product detail'
     #swagger.parameters['id'] = { in: 'path', type: 'string' }
     #swagger.responses[200] = { description: 'Product detail' }
  */
  getProductDetailHandler
);

// POST 1
router.post(
  '/product',
  validateProductReq,
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Create product'
     #swagger.requestBody = { required: true }
     #swagger.responses[201] = { description: 'Created' }
  */
  createProductHandler
);

// POST array
router.post(
  '/product/array',
  validateProductReq,
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Create many products'
     #swagger.requestBody = { required: true }
     #swagger.responses[201] = { description: 'Created' }
  */
  createManyProductHandler
);

// PUT
router.put(
  '/product/:id',
  validateProductReq,
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Update product'
     #swagger.parameters['id'] = { in: 'path', type: 'string' }
     #swagger.requestBody = { required: true }
     #swagger.responses[200] = { description: 'Updated' }
  */
  updateProductHandler
);

// DELETE
router.delete(
  '/product/:id',
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Delete product'
     #swagger.parameters['id'] = { in: 'path', type: 'string' }
     #swagger.responses[200] = { description: 'Deleted' }
  */
  deleteProductHandler
);

export default router;
