import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ProductsModule } from 'src/products/products.module';
import { PrintfulModule } from 'src/printful/printful.module';
import { CustomLoggerService } from 'src/logger.service';

@Module({
  imports: [ProductsModule, PrintfulModule],
  controllers: [AdminController],
  providers: [CustomLoggerService],
})
export class AdminModule {}
