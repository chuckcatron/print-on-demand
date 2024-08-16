import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { ProductsModule } from '../products/products.module';
import { CustomLoggerService } from 'src/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ProductsModule],
  providers: [OrdersService, CustomLoggerService],
  controllers: [OrdersController],
})
export class OrdersModule {}
