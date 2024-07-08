import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from 'src/logger.service';
export declare class PrintfulService {
    private readonly httpService;
    private readonly configService;
    private readonly loggerService;
    private readonly baseUrl;
    private readonly apiKey;
    private readonly storeNo;
    constructor(httpService: HttpService, configService: ConfigService, loggerService: CustomLoggerService);
    getProducts(): Promise<any>;
}
