import { Module } from '@nestjs/common';
import { PrintfulService } from './printful.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [PrintfulService],
  exports: [PrintfulService],
})
export class PrintfulModule {}
