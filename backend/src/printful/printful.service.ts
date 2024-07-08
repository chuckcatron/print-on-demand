import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrintfulService {
  private printfulApiKey: string;
  private apiBaseUrl = 'https://api.printful.com';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.printfulApiKey = this.configService.get<string>('PRINTFUL_API_KEY');
  }

  getProducts(): Observable<any> {
    return this.httpService
      .get(`${this.apiBaseUrl}/store/products`, {
        headers: { Authorization: `Bearer ${this.printfulApiKey}` },
      })
      .pipe(map((response) => response.data));
  }

  createOrder(order: any): Observable<any> {
    return this.httpService
      .post(`${this.apiBaseUrl}/orders`, order, {
        headers: { Authorization: `Bearer ${this.printfulApiKey}` },
      })
      .pipe(map((response) => response.data));
  }
}
