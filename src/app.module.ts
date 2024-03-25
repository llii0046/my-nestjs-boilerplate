import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ConfigurationKeyPaths,
  getConfiguration,
} from './config/configuration';
import { AdminModule } from './modules/admin/admin.module';
import { SharesModule } from './shares/shares.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfiguration],
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigurationKeyPaths>) => {
        return {
          autoLoadEntities: true,
          type: configService.get<any>('database.type'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          synchronize: configService.get<boolean>('database.synchronize'),
          logging: configService.get('database.logging'),
        };
      },
    }),
    SharesModule,
    ProductsModule,
    AdminModule,
  ],
})
export class AppModule {}
