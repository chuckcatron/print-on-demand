import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrintfulService } from './printful.service';
import { ConfigModule } from '@nestjs/config';
import { PrintfulController } from './printful.controller';
import { CustomLoggerService } from 'src/logger.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [CustomLoggerService, PrintfulService],
  exports: [PrintfulService],
  controllers: [PrintfulController],
})
export class PrintfulModule {}
