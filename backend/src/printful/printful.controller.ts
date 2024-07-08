import { Controller, Get } from '@nestjs/common';
import { PrintfulService } from './printful.service';

@Controller('printful')
export class PrintfulController {
  constructor(private readonly printfulService: PrintfulService) {}

  @Get('products')
  getProducts() {
    return this.printfulService.getProducts();
  }
}
