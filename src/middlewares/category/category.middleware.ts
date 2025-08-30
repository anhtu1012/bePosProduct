import { Request, Response, NextFunction } from 'express';
import { CategoryDto } from './category.request';
import { validate } from 'class-validator';

export async function validateCategoryReq(req: Request, res: Response, next: NextFunction) {
  const dto = new CategoryDto(req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Invalid category data',
      errors: errors.map((e) => e.constraints),
    });
  }
  next();
}
