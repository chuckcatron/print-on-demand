"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const printful_module_1 = require("./printful/printful.module");
const stripe_module_1 = require("./stripe/stripe.module");
const config_1 = require("@nestjs/config");
const authorization_module_1 = require("./authorization/authorization.module");
const products_module_1 = require("./products/products.module");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./products/entities/product.entity");
const orders_module_1 = require("./orders/orders.module");
const cognito_config_1 = require("./config/cognito.config");
const logger_service_1 = require("./logger.service");
const order_entity_1 = require("./orders/entities/order.entity");
const users_module_1 = require("./users/users.module");
const user_entity_1 = require("./users/entities/user.entity");
const admin_module_1 = require("./admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'your_db_username',
                password: 'your_db_password',
                database: 'your_db_name',
                entities: [order_entity_1.Order, product_entity_1.Product, user_entity_1.User],
                synchronize: true,
            }),
            config_1.ConfigModule.forRoot({ load: [cognito_config_1.default] }),
            admin_module_1.AdminModule,
            printful_module_1.PrintfulModule,
            orders_module_1.OrdersModule,
            stripe_module_1.StripeModule,
            authorization_module_1.AuthorizationModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            users_module_1.UsersModule,
            admin_module_1.AdminModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, logger_service_1.CustomLoggerService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map