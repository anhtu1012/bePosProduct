import { Request, Response } from 'express';

import HTTP_STATUS from '../constants/httpStatus';
import { CATEGORY_MESSAGES } from '../constants/messages/category';
import {
  createCategoryService,
  createManyCategoryService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
  getCategoryByCode,
  getCategoryService,
} from '../services/category.service';
//
// GET /category?limit=10&offset=0
export async function getAllCategorysHandler(req: Request, res: Response): Promise<void> {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : 0;
    const result = await getCategoryService({ limit, offset });
    res.status(HTTP_STATUS.OK).json({
      message: CATEGORY_MESSAGES.RETRIEVE_SUCCESS,
      ...result,
    });
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: CATEGORY_MESSAGES.RETRIEVE_FAILURE,
      error: error.message,
    });
  }
}

// GET /category/:id
export async function getCategoryDetailHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const category = await getCategoryByIdService(id);
    if (!category) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: CATEGORY_MESSAGES.NOT_FOUND,
      });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: CATEGORY_MESSAGES.RETRIEVE_SUCCESS,
      data: { ...category, id: category.id.toString() },
    });
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: CATEGORY_MESSAGES.RETRIEVE_FAILURE,
      error: error.message,
    });
  }
}

// POST /category (1 category)
export async function createCategoryHandler(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    if (data.code) {
      const codeExists = await getCategoryByCode(data.code);
      if (codeExists) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: CATEGORY_MESSAGES.DUPLICATE_CODE || 'Category code already exists.',
        });
        return;
      }
    }
    const category = await createCategoryService(data);
    res.status(HTTP_STATUS.CREATED).json({
      message: CATEGORY_MESSAGES.CREATE_SUCCESS,
      data: { ...category, id: category.id.toString() },
    });
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: CATEGORY_MESSAGES.CREATE_FAILURE,
      error: error.message,
    });
  }
}

// POST /category/array (nhiều category)
export async function createManyCategoryHandler(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    const result = await createManyCategoryService(data);
    res.status(HTTP_STATUS.CREATED).json({
      message: CATEGORY_MESSAGES.CREATE_SUCCESS,
      data: result,
    });
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: CATEGORY_MESSAGES.CREATE_FAILURE,
      error: error.message,
    });
  }
}

// PUT /category/:id
export async function updateCategoryHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const data = req.body;
    const category = await updateCategoryService(id, data);
    res.status(HTTP_STATUS.OK).json({
      message: CATEGORY_MESSAGES.UPDATE_SUCCESS,
      data: { ...category, id: category.id.toString() },
    });
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: CATEGORY_MESSAGES.UPDATE_FAILURE,
      error: error.message,
    });
  }
}

// DELETE /category/:id
export async function deleteCategoryHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    await deleteCategoryService(id);
    res.status(HTTP_STATUS.OK).json({
      message: CATEGORY_MESSAGES.DELETE_SUCCESS,
    });
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: CATEGORY_MESSAGES.DELETE_FAILURE,
      error: error.message,
    });
  }
}
