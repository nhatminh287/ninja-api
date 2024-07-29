import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { LocalStategy } from './strategies/local.strategy';

@Module({
  imports: [UsersModule, LoggerModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        MONGODB_URI: joi.string().required(),
        JWT_SECRET: joi.string().required(),
        JWT_EXPIRATION: joi.string().required(),
        PORT: joi.number().required()
      })
     }),
    JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
      },
    }),
    inject: [ConfigService],
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStategy],
})
export class AuthModule {}
