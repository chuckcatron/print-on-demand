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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const logger_service_1 = require("../logger.service");
const class_validator_1 = require("class-validator");
const printful_service_1 = require("../printful/printful.service");
let ProductsService = class ProductsService {
    constructor(productsRepository, printfulService, loggerService) {
        this.productsRepository = productsRepository;
        this.printfulService = printfulService;
        this.loggerService = loggerService;
    }
    getAllProducts() {
        return this.productsRepository.find();
    }
    getProductById(id) {
        return this.productsRepository.findOne({ where: { id } });
    }
    async createProduct(createProductDto) {
        const product = this.productsRepository.create(createProductDto);
        const result = await this.productsRepository.save(product);
        this.loggerService.log(`Product created: ${JSON.stringify(result)}`);
        return result;
    }
    async updateProduct(id, updateProductDto) {
        await this.productsRepository.update(id, updateProductDto);
        return this.productsRepository.findOne({ where: { id } });
    }
    async deleteProduct(id) {
        return await this.productsRepository.delete(id).then(() => undefined);
    }
    async importProducts() {
        this.loggerService.log('Importing products from Printful');
        const products = await this.printfulService.getProducts();
        const createProductDtos = products.map((product) => ({
            id: product.id,
            externalId: product.external_id,
            name: product.name,
            variants: product.variants,
            synced: product.synced,
            thumbnailUrl: product.thumbnail_url,
            isIgnored: product.is_ignored,
        }));
        const validProducts = [];
        for (const validProduct of createProductDtos) {
            const errors = await (0, class_validator_1.validate)(validProduct);
            if (errors.length > 0) {
                console.error('Validation failed:', errors);
                continue;
            }
            const existingProduct = await this.productsRepository.findOne({
                where: { externalId: validProduct.externalId },
            });
            if (existingProduct) {
                validProducts.push(await this.updateProduct(existingProduct.id, validProduct));
            }
            else {
                validProducts.push(await this.createProduct(validProduct));
            }
        }
        return validProducts;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        printful_service_1.PrintfulService,
        logger_service_1.CustomLoggerService])
], ProductsService);
//# sourceMappingURL=products.service.js.map