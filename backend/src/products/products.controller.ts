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

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
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
  ) {
    const product = this.productsService.updateProduct(id, updateProductDto);

    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProduct(id);
  }
}
