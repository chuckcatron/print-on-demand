import { Logger } from '@nestjs/common';
export declare class CustomLoggerService extends Logger {
    log(message: string): void;
    error(message: string, trace: string): void;
    warn(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
}
