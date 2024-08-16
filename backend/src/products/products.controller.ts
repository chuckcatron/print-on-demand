import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { JwtAuthGuard } from '../authorization/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CustomLoggerService } from '../logger.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly loggerService: CustomLoggerService,
  ) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/import')
  importProducts() {
    return this.productsService.importProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    console.log('Received create product request:', createProductDto); // Debugging line
    const product = await this.productsService.createProduct(createProductDto);
    console.log('Product created:', product); // Debugging line
    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = this.productsService.updateProduct(id, updateProductDto);

    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProduct(id);
  }
}
