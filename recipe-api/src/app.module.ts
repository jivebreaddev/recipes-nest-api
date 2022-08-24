import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecipeModule } from './recipe/recipe.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Recipe } from './recipe/entities/recipe.entity';
import { Ingredient } from './recipe/entities/ingredient.entity';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev'
        ? {
            type: 'sqlite',
            database: process.env.DB_SCHEMA,
            synchronize: true,
            autoLoadEntities: true,
          }
        : {
            type: 'postgres',
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            database: process.env.DB_SCHEMA,
            synchronize: true,
            port: +process.env.DB_PORT,
            entities: ['dist/**/**/*.entity{.ts,.js}'],
          },
    ),
    UserModule,
    RecipeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
