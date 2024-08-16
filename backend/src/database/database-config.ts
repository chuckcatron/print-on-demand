import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    console.log('Here we are');
    return {
      type: 'mysql',
      host: 'MYSQL5046.site4now.net',
      port: 3306,
      username: 'a47ba2_print',
      password: '',
      database: 'db_a47ba2_print',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
