import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  private readonly logLevel: string;

  constructor(private configService: ConfigService) {
    super();
    this.logLevel = this.configService.get<string>('LOG_LEVEL') || 'log';
  }

  log(message: string) {
    if (this.shouldLog('log')) {
      super.log(message);
    }
  }

  error(message: string, trace: string) {
    if (this.shouldLog('error')) {
      super.error(message, trace);
    }
  }

  warn(message: string) {
    if (this.shouldLog('warn')) {
      super.warn(message);
    }
  }

  debug(message: string) {
    if (this.shouldLog('debug')) {
      super.debug(message);
    }
  }

  verbose(message: string) {
    if (this.shouldLog('verbose')) {
      super.verbose(message);
    }
  }

  private shouldLog(level: string): boolean {
    const levels = ['log', 'error', 'warn', 'debug', 'verbose'];
    return levels.indexOf(level) <= levels.indexOf(this.logLevel);
  }
}
