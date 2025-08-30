import { IsString, Length } from 'class-validator';

export class CategoryDto {
  @IsString()
  @Length(1, 50)
  code: string;

  @IsString()
  @Length(1, 255)
  name: string;

  constructor(data: any) {
    this.code = data.code;
    this.name = data.name;
  }
}
