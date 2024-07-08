import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CustomLoggerService } from '../logger.service';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly loggerService: CustomLoggerService,
  ) {}

  @Post('create-charge')
  async createCharge(
    @Body('amount') amount: number,
    @Body('currency') currency: string,
    @Body('source') source: string,
    @Body('description') description: string,
  ) {
    this.loggerService.log('Creating charge for customer');
    return this.stripeService.createCharge(
      amount,
      currency,
      source,
      description,
    );
  }

  @Post('create-refund')
  async createRefund(
    @Body('chargeId') chargeId: string,
    @Body('amount') amount?: number,
  ) {
    this.loggerService.log('Creating refund for charge');
    return this.stripeService.createRefund(chargeId, amount);
  }
}
