import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { CustomLoggerService } from '../logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService, CustomLoggerService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
