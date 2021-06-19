import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  count: number;
}
