import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';
import { StripeController } from './stripe.controller';
import { CustomLoggerService } from '../logger.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [StripeController],
  providers: [StripeService, CustomLoggerService],
  exports: [StripeService],
})
export class StripeModule {}
