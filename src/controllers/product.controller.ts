import { Request, Response } from 'express';
import HTTP_STATUS from '../constants/httpStatus';
import {
  createManyProductService,
  createProductService,
  deleteProductService,
  getProductByIdService,
  getProductByNameService,
  updateProductService,
  getProductService,
} from '../services/product.service';
import { getListWithPaging } from '../utils/listWithPaging.utils';
import { PRODUCT_MESSAGES } from '../constants/messages/proudct';
import { emitToAll } from '../utils/socket.utils';

// GET /product?limit=10&offset=0&name=abc
export async function getAllProductsHandler(req: Request, res: Response): Promise<void> {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : 0;
    const name = req.query.name as string | undefined;
    const result = await getProductService({ limit, offset, name });
    res.status(HTTP_STATUS.OK).json({
      message: PRODUCT_MESSAGES.RETRIEVE_SUCCESS,
      ...result,
    });
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: PRODUCT_MESSAGES.RETRIEVE_FAILURE,
      error: error.message,
    });
  }
}

// GET /product/:id
export async function getProductDetailHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const product = await getProductByIdService(id);
    if (!product) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: PRODUCT_MESSAGES.NOT_FOUND,
      });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: PRODUCT_MESSAGES.RETRIEVE_SUCCESS,
      data: { ...product, id: product.id.toString(), categoryId: product.categoryId.toString() },
    });
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: PRODUCT_MESSAGES.RETRIEVE_FAILURE,
      error: error.message,
    });
  }
}

// POST /product
export async function createProductHandler(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    const existed = await getProductByNameService(data.name);
    if (existed) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: PRODUCT_MESSAGES.DUPLICATE_NAME,
      });
      return;
    }
    const product = await createProductService(data);
    // Emit socket event for product creation
    emitToAll('PRODUCT_KEY', {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId.toString(),
    });
    res.status(HTTP_STATUS.CREATED).json({
      message: PRODUCT_MESSAGES.CREATE_SUCCESS,
      data: { ...product, id: product.id.toString(), categoryId: product.categoryId.toString() },
    });
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: PRODUCT_MESSAGES.CREATE_FAILURE,
      error: error.message,
    });
  }
}

// POST /product/array
export async function createManyProductHandler(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    const result = await createManyProductService(data);
    // Emit socket event for bulk product creation
    emitToAll('PRODUCT_KEY', {
      count: result.count,
      message: `${result.count} products created successfully`,
    });
    res.status(HTTP_STATUS.CREATED).json({
      message: PRODUCT_MESSAGES.CREATE_SUCCESS,
      data: result,
    });
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: PRODUCT_MESSAGES.CREATE_FAILURE,
      error: error.message,
    });
  }
}

// PUT /product/:id
export async function updateProductHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const data = req.body;
    const product = await updateProductService(id, data);
    res.status(HTTP_STATUS.OK).json({
      message: PRODUCT_MESSAGES.UPDATE_SUCCESS,
      data: { ...product, id: product.id.toString(), categoryId: product.categoryId.toString() },
    });
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: PRODUCT_MESSAGES.UPDATE_FAILURE,
      error: error.message,
    });
  }
}

// DELETE /product/:id
export async function deleteProductHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    await deleteProductService(id);
    res.status(HTTP_STATUS.OK).json({
      message: PRODUCT_MESSAGES.DELETE_SUCCESS,
    });
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: PRODUCT_MESSAGES.DELETE_FAILURE,
      error: error.message,
    });
  }
}
