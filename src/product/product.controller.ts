import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UsePipes,
  ValidationPipe,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ProductUpdateDto } from './dto/productUpdate.dto';

@Controller('/products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() productDto: ProductDto) {
    // const reqData = data.deleted == true ? true : false;
    // const paramData = { ...data, deleted: reqData };
    return this.productService.create(productDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: number, @Body() productUpdateDto: ProductUpdateDto) {
    // const reqData = data.deleted == true ? true : false;
    // const paramData = { ...data, deleted: reqData };
    return this.productService.update(id, productUpdateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const isUserDeleted = await this.productService.findOne(id);
    console.log(`is user deleted -->`, isUserDeleted);
    if (isUserDeleted) {
      return await this.productService.remove(id);
    } else {
      return { message: 'User already deleted!' };
    }
  }

  @Post('restore/:id')
  restore(@Param('id') id: number) {
    return this.productService.restore(id);
  }
}
