import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CustomLoggerService } from '../logger.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { validate } from 'class-validator';
import { PrintfulService } from '../printful/printful.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private readonly printfulService: PrintfulService,
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

  async importProducts(): Promise<Product[]> {
    this.loggerService.log('Importing products from Printful');
    const products = await this.printfulService.getProducts();
    const createProductDtos = products.map((product) => ({
      id: product.id,
      externalId: product.external_id,
      name: product.name,
      variants: product.variants,
      synced: product.synced,
      thumbnailUrl: product.thumbnail_url,
      isIgnored: product.is_ignored,
    }));

    const validProducts = [];

    for (const validProduct of createProductDtos) {
      const errors = await validate(validProduct);
      if (errors.length > 0) {
        console.error('Validation failed:', errors);
        continue;
      }

      const existingProduct = await this.productsRepository.findOne({
        where: { externalId: validProduct.externalId },
      });

      if (existingProduct) {
        validProducts.push(
          await this.updateProduct(existingProduct.id, validProduct),
        );
      } else {
        validProducts.push(await this.createProduct(validProduct));
      }
    }

    return validProducts;
  }
}
