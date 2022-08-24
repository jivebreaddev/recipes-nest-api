import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecipeModule } from './recipe/recipe.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get<string>('NODE_ENV') === 'test' ||
          config.get<string>('NODE_ENV') === 'dev'
          ? {
              type: 'sqlite',
              database: config.get<string>('DB_SCHEMA'),
              synchronize: true,
              autoLoadEntities: true,
            }
          : {
              type: 'postgres',
              username: config.get<string>('DB_USER'),
              password: config.get<string>('DB_PASSWORD'),
              host: config.get<string>('DB_HOST'),
              database: config.get<string>('DB_SCHEMA'),
              synchronize: true,
              port: +process.env.DB_PORT,
              entities: ['dist/**/**/*.entity{.ts,.js}'],
            };
      },
    } as TypeOrmModuleOptions),
    UserModule,
    RecipeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
