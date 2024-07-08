import { StripeService } from './stripe.service';
import { CustomLoggerService } from '../logger.service';
export declare class StripeController {
    private readonly stripeService;
    private readonly loggerService;
    constructor(stripeService: StripeService, loggerService: CustomLoggerService);
    createCharge(amount: number, currency: string, source: string, description: string): Promise<any>;
    createRefund(chargeId: string, amount?: number): Promise<any>;
}
