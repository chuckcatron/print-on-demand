import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class StripeService {
    private readonly httpService;
    private readonly configService;
    private readonly baseUrl;
    private readonly apiKey;
    constructor(httpService: HttpService, configService: ConfigService);
    createCharge(amount: number, currency: string, source: string, description: string): Promise<any>;
    createRefund(chargeId: string, amount?: number): Promise<any>;
}
