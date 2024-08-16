import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/authorization/jwt-auth.guard';
import { PrintfulService } from 'src/printful/printful.service';
import { ProductsService } from 'src/products/products.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly printfulService: PrintfulService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('import-products')
  async importProducts() {
    const result = await this.productsService.importProducts();
    return result;
  }

  @Get()
  async test() {
    return 'Admin test';
  }
}
