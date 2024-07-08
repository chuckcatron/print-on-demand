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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintfulService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const logger_service_1 = require("../logger.service");
let PrintfulService = class PrintfulService {
    constructor(httpService, configService, loggerService) {
        this.httpService = httpService;
        this.configService = configService;
        this.loggerService = loggerService;
        this.baseUrl = 'https://api.printful.com';
        this.apiKey = this.configService.get('PRINTFUL_API_KEY');
        this.storeNo = this.configService.get('PRINTFUL_STORE_NO');
        this.loggerService.log(`Printful API key: ${this.apiKey}`);
    }
    async getProducts() {
        console.log('Sending request to Printful API');
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService
                .get(`${this.baseUrl}/store/products`, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'X-PF-Store-Id': this.storeNo,
                },
            })
                .pipe((0, operators_1.map)((response) => response.data), (0, operators_1.catchError)((error) => {
                console.error('Error response from Printful:', error.response.data);
                return (0, rxjs_1.throwError)(error);
            })));
            return response;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.PrintfulService = PrintfulService;
exports.PrintfulService = PrintfulService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        logger_service_1.CustomLoggerService])
], PrintfulService);
//# sourceMappingURL=printful.service.js.map