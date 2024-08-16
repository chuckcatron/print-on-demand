import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomLoggerService } from 'src/logger.service';

@Injectable()
export class PrintfulService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly storeNo: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly loggerService: CustomLoggerService,
  ) {
    this.baseUrl = 'https://api.printful.com';
    this.apiKey = this.configService.get<string>('PRINTFUL_API_KEY');
    this.storeNo = this.configService.get<string>('PRINTFUL_STORE_NO');
    this.loggerService.log(`Printful API key: ${this.apiKey}`);
  }

  async getProducts(): Promise<any> {
    console.log('Sending request to Printful API');
    try {
      const observable = this.httpService
        .get(`${this.baseUrl}/store/products`, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'X-PF-Store-Id': this.storeNo, // Replace with your store ID
          },
        })
        //const observable = this.httpService.post('http://localhost:3001/login', jsonData)
        .pipe(map((response: AxiosResponse) => response.data));

      const result = await lastValueFrom(observable);
      const response = result.result;
      return response;
    } catch (error) {
      throw error;
    }
  }
}
