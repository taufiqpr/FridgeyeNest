import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaUserRepository, USER_REPOSITORY } from './repositories/user.repository';
import { RegisterUseCase } from './use-cases/register.use-case';
import { LoginUseCase } from './use-cases/login.use-case';
import { CONFIG_KEYS } from 'src/config/config.keys';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(CONFIG_KEYS.JWT.SECRET),
        signOptions: { expiresIn: config.get<string>(CONFIG_KEYS.JWT.EXPIRES_IN) },
      }),
    }),
  ],
  providers: [
    AuthService,
    PrismaUserRepository,
    { provide: USER_REPOSITORY, useExisting: PrismaUserRepository },
    RegisterUseCase,
    LoginUseCase,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
