import { IsString, Length, IsInt, IsBoolean, IsNumber } from 'class-validator';

export class ProductDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsInt()
  categoryId: number;

  @IsString()
  @Length(1, 255)
  image: string;

  @IsInt()
  price: number;

  @IsInt()
  discountPercent: number;

  @IsString()
  @Length(1, 500)
  description: string;

  @IsNumber()
  rating: number;

  @IsInt()
  reviews: number;

  @IsBoolean()
  isBestSeller: boolean;

  @IsBoolean()
  isActive: boolean;

  constructor(data: any) {
    this.name = data.name;
    this.categoryId = data.categoryId;
    this.image = data.image;
    this.price = data.price;
    this.discountPercent = data.discountPercent;
    this.description = data.description;
    this.rating = data.rating;
    this.reviews = data.reviews;
    this.isBestSeller = data.isBestSeller;
    this.isActive = data.isActive;
  }
}
