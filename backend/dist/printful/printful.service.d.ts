import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
export declare class PrintfulService {
    private readonly httpService;
    private readonly configService;
    private printfulApiKey;
    private apiBaseUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    getProducts(): Observable<any>;
    createOrder(order: any): Observable<any>;
}
