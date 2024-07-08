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
exports.StripeService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let StripeService = class StripeService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.baseUrl = 'https://api.stripe.com/v1';
        this.apiKey = this.configService.get('STRIPE_API_KEY');
    }
    async createCharge(amount, currency, source, description) {
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService
                .post(`${this.baseUrl}/charges`, new URLSearchParams({
                amount: amount.toString(),
                currency,
                source,
                description,
            }).toString(), {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .pipe((0, operators_1.map)((response) => response.data), (0, operators_1.catchError)((error) => {
                console.error('Error response from Stripe:', error.response.data);
                return (0, rxjs_1.throwError)(new common_1.HttpException(error.response.data, common_1.HttpStatus.BAD_REQUEST));
            })));
            return response;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createRefund(chargeId, amount) {
        try {
            const params = new URLSearchParams({ charge: chargeId });
            if (amount) {
                params.append('amount', amount.toString());
            }
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService
                .post(`${this.baseUrl}/refunds`, params.toString(), {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .pipe((0, operators_1.map)((response) => response.data), (0, operators_1.catchError)((error) => {
                console.error('Error response from Stripe:', error.response.data);
                return (0, rxjs_1.throwError)(new common_1.HttpException(error.response.data, common_1.HttpStatus.BAD_REQUEST));
            })));
            return response;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], StripeService);
//# sourceMappingURL=stripe.service.js.map