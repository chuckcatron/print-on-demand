import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StripeService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = 'https://api.stripe.com/v1';
    this.apiKey = this.configService.get<string>('STRIPE_API_KEY');
  }

  async createCharge(
    amount: number,
    currency: string,
    source: string,
    description: string,
  ): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService
          .post(
            `${this.baseUrl}/charges`,
            new URLSearchParams({
              amount: amount.toString(),
              currency,
              source,
              description,
            }).toString(),
            {
              headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          .pipe(
            map((response) => response.data),
            catchError((error) => {
              console.error('Error response from Stripe:', error.response.data);
              return throwError(
                new HttpException(error.response.data, HttpStatus.BAD_REQUEST),
              );
            }),
          ),
      );
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createRefund(chargeId: string, amount?: number): Promise<any> {
    try {
      const params = new URLSearchParams({ charge: chargeId });
      if (amount) {
        params.append('amount', amount.toString());
      }

      const response = await lastValueFrom(
        this.httpService
          .post(`${this.baseUrl}/refunds`, params.toString(), {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          .pipe(
            map((response) => response.data),
            catchError((error) => {
              console.error('Error response from Stripe:', error.response.data);
              return throwError(
                new HttpException(error.response.data, HttpStatus.BAD_REQUEST),
              );
            }),
          ),
      );
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
