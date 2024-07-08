import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
export declare class StripeService {
    private readonly configService;
    private readonly stripe;
    constructor(configService: ConfigService);
    createPaymentIntent(amount: number, currency: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
}
