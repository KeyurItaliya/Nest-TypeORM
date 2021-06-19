import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { CategoryUpdateDto } from './dto/categoryUpdate.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.categoryService.findOne(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() categoryDto: CategoryDto) {
    const category = await this.categoryService.create(categoryDto);
    return category;
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') id: number,
    @Body() categoryUpdateDto: CategoryUpdateDto,
  ) {
    return this.categoryService.update(id, categoryUpdateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    return this.categoryService.remove(id);
  }

  @Post('restore/:id')
  restore(@Param('id', ParseIntPipe) id) {
    return this.categoryService.restore(id);
  }
}
