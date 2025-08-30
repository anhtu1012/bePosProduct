import { Router } from 'express';

import {
  getAllCategorysHandler,
  getCategoryDetailHandler,
  createCategoryHandler,
  createManyCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from '../controllers/category.controller';
import { validateCategoryReq } from '../middlewares/category/category.middleware';

const router = Router();

// GET list with limit/offset
router.get(
  '/category',
  /* #swagger.tags = ['Categories']
     #swagger.summary = 'Get all categories'
     #swagger.parameters['limit'] = { in: 'query', type: 'integer' }
     #swagger.parameters['offset'] = { in: 'query', type: 'integer' }
     #swagger.responses[200] = {
       description: 'List of categories',
        schema: { type: 'array', items: { $ref: '#/components/schemas/Category' } }
    }
  */
  getAllCategorysHandler
);

// GET detail
router.get(
  '/category/:id',
  /* #swagger.tags = ['Categories']
     #swagger.summary = 'Get category detail'
     #swagger.parameters['id'] = { in: 'path', type: 'string' }
     #swagger.responses[200] = { description: 'Category detail' }
  */
  getCategoryDetailHandler
);

// POST 1
router.post(
  '/category',
  validateCategoryReq,
  /* #swagger.tags = ['Categories']
     #swagger.summary = 'Create category'
     #swagger.requestBody = { required: true }
     #swagger.responses[201] = { description: 'Created' }
  */
  createCategoryHandler
);

// POST array
router.post(
  '/category/array',
  validateCategoryReq,
  /* #swagger.tags = ['Categories']
     #swagger.summary = 'Create many categories'
     #swagger.requestBody = { required: true }
     #swagger.responses[201] = { description: 'Created' }
  */
  createManyCategoryHandler
);

// PUT
router.put(
  '/category/:id',
  validateCategoryReq,
  /* #swagger.tags = ['Categories']
     #swagger.summary = 'Update category'
     #swagger.parameters['id'] = { in: 'path', type: 'string' }
     #swagger.requestBody = { required: true }
     #swagger.responses[200] = { description: 'Updated' }
  */
  updateCategoryHandler
);

// DELETE
router.delete(
  '/category/:id',
  /* #swagger.tags = ['Categories']
     #swagger.summary = 'Delete category'
     #swagger.parameters['id'] = { in: 'path', type: 'string' }
     #swagger.responses[200] = { description: 'Deleted' }
  */
  deleteCategoryHandler
);

export default router;
