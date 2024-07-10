import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrintfulModule } from './printful/printful.module';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { OrdersModule } from './orders/orders.module';
import cognitoConfig from './config/cognito.config';
import { CustomLoggerService } from './logger.service';
import { Order } from './orders/entities/order.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_db_username',
      password: 'your_db_password',
      database: 'your_db_name',
      entities: [Order, Product, User],
      synchronize: true,
    }),
    ConfigModule.forRoot({ load: [cognitoConfig] }),
    AdminModule,
    PrintfulModule,
    OrdersModule,
    StripeModule,
    AuthorizationModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, CustomLoggerService],
})
export class AppModule {}
