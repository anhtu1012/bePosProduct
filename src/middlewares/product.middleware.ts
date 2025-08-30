import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { ProductDto } from './product.dto';

export async function validateProductReq(req: Request, res: Response, next: NextFunction) {
  const dto = new ProductDto(req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Invalid product data',
      errors: errors.map((e) => e.constraints),
    });
  }
  next();
}
