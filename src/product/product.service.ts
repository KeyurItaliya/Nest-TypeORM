import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';
import { ProductUpdateDto } from './dto/productUpdate.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll() {
    try {
      return await this.productRepository.find();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error handling service.');
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne(id);
      if (!product)
        throw new NotFoundException(`Record with id ${id} not found.`);

      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error handling service.');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      await this.productRepository.softDelete(id);
      return 'Success';
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error handling service.');
    }
  }

  async restore(id: number) {
    try {
      const product = await this.productRepository.findOne(id, {
        withDeleted: true,
      });

      if (!product)
        throw new NotFoundException(`Record with id ${id} not found.`);

      await this.productRepository.restore(id);
      return 'Success';
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error handling service.');
    }
  }

  async create(productDto: ProductDto) {
    const product = new Product();
    const { name, category, count } = productDto;

    product.name = name;
    product.category = category;
    product.count = count;

    try {
      await this.productRepository.save(product);
      return 'success';
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error handling service.');
    }
  }

  async update(id: number, productUpdateDto: ProductUpdateDto) {
    const product = await this.findOne(id);

    const { count, category, name } = productUpdateDto;

    if (name) product.name = name;
    if (category) product.category = category;
    if (count) product.count = count;

    try {
      return await this.productRepository.save(product);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error handling service.');
    }
  }
}
