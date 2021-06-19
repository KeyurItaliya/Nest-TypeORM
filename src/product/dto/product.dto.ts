import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsNotEmpty()
  @IsNumber()
  count: number;
}
