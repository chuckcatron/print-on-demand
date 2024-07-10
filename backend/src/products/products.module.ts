import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { CustomLoggerService } from '../logger.service';
import { PrintfulModule } from 'src/printful/printful.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), PrintfulModule],
  providers: [ProductsService, CustomLoggerService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
