import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from 'src/logger.service';
declare const JwtStrategy_base: new (...args: any[]) => InstanceType<any>;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private readonly loggerService;
    constructor(configService: ConfigService, loggerService: CustomLoggerService);
    validate(payload: any): Promise<{
        userId: any;
        username: any;
    }>;
}
export {};
