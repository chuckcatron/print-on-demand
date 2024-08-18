import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrintfulModule } from './printful/printful.module';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import cognitoConfig from './config/cognito.config';
import { CustomLoggerService } from './logger.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AppConfigModule } from './app-config/app-config.module';
import { DatabaseConfigService } from './database/database-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
      inject: [],
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [cognitoConfig] }),
    AdminModule,
    AppConfigModule,
    PrintfulModule,
    OrdersModule,
    StripeModule,
    AuthorizationModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, CustomLoggerService],
})
export class AppModule {}
