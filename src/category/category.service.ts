import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import { CategoryUpdateDto } from './dto/categoryUpdate.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(data: CategoryDto) {
    try {
      const addCategoryData = await this.categoryRepository.save(data);
      if (!addCategoryData)
        throw new InternalServerErrorException('Data Not Added');
      return addCategoryData;
    } catch (e) {
      return new InternalServerErrorException('Error handling service.');
    }
  }

  async findAll() {
    try {
      const allCategory = await this.categoryRepository.find();
      if (!allCategory) throw new NotFoundException('Record Not Found!');
      return allCategory;
    } catch (e) {
      return new InternalServerErrorException('Error handling service.');
    }
  }
  async findOne(id: number) {
    try {
      const allCategory = await this.categoryRepository.findOne(id);
      if (!allCategory)
        throw new NotFoundException(`Record of ${id} not found service.`);
      return allCategory;
    } catch (e) {
      return new InternalServerErrorException('Error handling service.');
    }
  }
  async update(id: number, categoryUpdateDto: CategoryUpdateDto) {
    try {
      const category = await this.findOne(id);

      const { name } = categoryUpdateDto;

      if (name) category.name = name;

      await this.categoryRepository.save(category);
      return 'success';
    } catch (error) {
      throw new InternalServerErrorException('Error handling service.');
    }
  }
  async remove(id: number) {
    try {
      await this.findOne(id);
      await this.categoryRepository.softDelete(id);
      return 'success';
    } catch (error) {
      return new InternalServerErrorException('Error handling service.');
    }
  }

  async restore(id) {
    try {
      const allCategory = await this.categoryRepository.findOne(id, {
        withDeleted: true,
      });
      if (!allCategory)
        throw new NotFoundException(`Record of ${id} not found service.`);
      const restore = await this.categoryRepository.restore(id);
      if (restore.raw.changedRows) {
        return { message: 'category restore success!' };
      } else {
        return { message: 'category not restore!' };
      }
    } catch (e) {
      console.log('not found');
      return { message: 'something went wrong!' };
    }
  }
}
