"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const products_service_1 = require("../products/products.service");
const logger_service_1 = require("../logger.service");
let OrdersService = class OrdersService {
    constructor(ordersRepository, productsService, loggerService) {
        this.ordersRepository = ordersRepository;
        this.productsService = productsService;
        this.loggerService = loggerService;
    }
    getAllOrders() {
        return this.ordersRepository.find({ relations: ['product'] });
    }
    getOrderById(id) {
        return this.ordersRepository.findOne({
            where: { id },
            relations: ['product'],
        });
    }
    async createOrder(orderData) {
        this.loggerService.log(`Creating order for product ${orderData.product.id ?? 123}`);
        const product = await this.productsService.getProductById(orderData.product.id);
        if (!product) {
            throw new Error('Product not found');
        }
        orderData.status = 'pending';
        this.loggerService.debug(`OrderData: ${JSON.stringify(orderData)}`);
        const order = this.ordersRepository.create({
            ...orderData,
            product,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return this.ordersRepository.save(order);
    }
    async updateOrder(id, orderData) {
        await this.ordersRepository.update(id, {
            ...orderData,
            updatedAt: new Date(),
        });
        return this.ordersRepository.findOne({
            where: { id },
            relations: ['product'],
        });
    }
    deleteOrder(id) {
        return this.ordersRepository.delete(id).then(() => undefined);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_service_1.ProductsService,
        logger_service_1.CustomLoggerService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map