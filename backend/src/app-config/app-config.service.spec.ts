import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { SecretsManagerService } from '../secrets-manager/secrets-manager.service';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let secretsManagerService: SecretsManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'INTERNAL_API_SECRET_PATH':
                  return 'prod/verdant/internal';
                case 'LOG_LEVEL':
                  return 'debug';
                case 'REGION':
                  return 'us-east-1';
                case 'AUTHENTICATION_APP_URL':
                  return 'http://localhost:3000';
                case 'NODE_ENV':
                  return 'development';
                default:
                  return null;
              }
            }),
          },
        },
        {
          provide: SecretsManagerService,
          useValue: {
            getSecret: jest.fn().mockResolvedValue({
              endpoint: 'http://internal.endpoint',
              key: 'internalApiKey',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
    secretsManagerService = module.get<SecretsManagerService>(
      SecretsManagerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize internalEndpoint and internalApiKey on module init', async () => {
    await service.onModuleInit();

    expect(service.internalEndpoint).toBe('http://internal.endpoint');
    expect(service.internalApiKey).toBe('internalApiKey');
    expect(secretsManagerService.getSecret).toHaveBeenCalledWith(
      'prod/verdant/internal',
      { asJson: true },
    );
  });

  it('should have default values for logLevel, region, wwwAuthenticateHeader, authenticationAppUrl, and nodeEnv', () => {
    expect(service.logLevel).toBe('debug');
    expect(service.region).toBe('us-east-1');
    expect(service.wwwAuthenticateHeader).toBe(
      'Basic realm="sensi integration", charset="UTF-8"',
    );
    expect(service.authenticationAppUrl).toBe('http://localhost:3000');
    expect(service.nodeEnv).toBe('development');
  });
});
