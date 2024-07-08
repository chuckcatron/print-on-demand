import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CustomLoggerService } from 'src/logger.service';
import { CreateProductDto } from './dto/create-product.dto';
import { create } from 'domain';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private readonly loggerService: CustomLoggerService,
  ) {}

  getAllProducts(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  getProductById(id: number): Promise<Product> {
    return this.productsRepository.findOne({ where: { id } });
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    const result = await this.productsRepository.save(product);
    this.loggerService.log(`Product created: ${JSON.stringify(result)}`);
    return result;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productsRepository.update(id, updateProductDto);
    return this.productsRepository.findOne({ where: { id } });
  }

  async deleteProduct(id: number): Promise<void> {
    return await this.productsRepository.delete(id).then(() => undefined);
  }
}
